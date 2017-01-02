// localStorage wrapper
module.exports = {
  getAll: (storeName, cb) => {
    try {
      cb(JSON.parse(window.localStorage[storeName]))
    } catch (e) {
      cb([])
    }
  },
  add: (storeName, item, cb) => {
    store.getAll(storeName, (items) => {
      items.push(item)
      window.localStorage[storeName] = JSON.stringify(items)
      cb()
    })
  },
  replace: (storeName, index, item, cb) => {
    store.getAll(storeName, (items) => {
      items[index] = item
      window.localStorage[storeName] = JSON.stringify(items)
      cb()
    })
  }
}