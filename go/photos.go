package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"sync"

	"github.com/gorilla/mux"
	"go4.org/syncutil/singleflight"
)

type photocache struct {
	group singleflight.Group
	// TODO: once https://go-review.googlesource.com/c/33912 goes in, use it here.
	mu     sync.RWMutex      // guards following fields
	photos map[string][]byte // key: key, val: cached photo
	host   string
}

// get retrieves the photo keyed by key, downloading it from url if not cached.
// if url is "", no download is attempted.
func (c *photocache) get(key, url string) []byte {
	c.mu.RLock()
	if data, ok := c.photos[key]; ok {
		c.mu.RUnlock()
		return data
	}
	c.mu.RUnlock()
	// Cache miss.
	if url == "" {
		// No idea where to fetch it, give up.
		// Should not happen except during server restarts.
		return nil
	}
	data, err := c.group.Do(key, func() (interface{}, error) {
		log.Printf("photocache: fetch %s for %s", url, key)
		resp, err := http.Get(url)
		if err != nil {
			return nil, err
		}
		data, err := ioutil.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			return nil, err
		}
		c.mu.Lock()
		if c.photos == nil {
			c.photos = make(map[string][]byte)
		}
		log.Printf("photocache: store %d bytes for %s", len(data), key)
		c.photos[key] = data
		c.mu.Unlock()
		return data, nil
	})
	if err != nil {
		log.Printf("photocache: fail to fetch %s for %s: %v", url, key, err)
		return nil
	}
	return data.([]byte)
}

func (c *photocache) serve(w http.ResponseWriter, r *http.Request) {
	key := mux.Vars(r)["key"]
	// log.Printf("serve %q", key)
	data := c.get(key, "")
	if data == nil {
		http.NotFound(w, r)
		return
	}

	w.Write(data)
}

func (c *photocache) url(key string) string {
	u := url.URL{
		Path: "/photo/" + key,
	}
	// log.Printf("url for %s: %s", key, u.String())
	return c.host + u.String()
}
