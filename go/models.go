package main

// Issue is a thing to care about and call on
type Issue struct {
	Name     string    `json:"name"`
	Script   string    `json:"script"`
	Contacts []Contact `json:"contacts"`
}

// Contact is a single point of contact related to an issue
type Contact struct {
	Name     string `json:"name"`
	Phone    string `json:"phone"`
	PhotoURL string `json:"photoURL"`
	Area     string `json:"area"`
}
