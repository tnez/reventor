# Adapter: InMemory

The **InMemory** adapter can be used for the purpose of development and / or testing. It allows for working without the need for additional dependencies or complexity as well as easy debugging.

## Example Usage

You might choose to instantiate your adapter in a dedicated file so that it can be handled appropriately on the basis of environment.


```js
// store.js
const {
  createStore,
  adapters: { InMemory, SomeOther }
} = require('reventor')
const reducer = require('./reducer')

const adapter = process.env.NODE_ENV === 'production'
? new SomeOther()
: new InMemory()

const { dispatch, getState } = createStore(adapter, reducer)

module.exports = {
  dispatch,
  getState,
}
```

```js
// reducer.js
module.exports = (prevState = {}, event) {
  const { aggregateId, data, eventType } = event
  switch (eventType) {
    case 'agg-root:created':
      return { aggregateId, ...data }
    case 'agg-root:updated':
      return { ...prevState, ...data }
    default:
      return prevState
  }
}
```
