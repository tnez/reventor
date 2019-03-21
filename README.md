Stupid-simple event sourcing.

# REVENTOR

[![npm version](https://badge.fury.io/js/reventor.svg)](https://badge.fury.io/js/reventor)
[![GitHub license](https://img.shields.io/github/license/tnez/reventor.svg)](https://github.com/tnez/reventor/blob/master/LICENCE)

An event-driven persistence for the application layer inspired by [Redux](https://redux.js.org/).

_Note: this currently provides an in-memory implementation, not suitable for production_

## createStore

```js
const { createStore, adapters: { InMemory } } = require('reventor')

// Just like Redux, a reducer takes the previous state and a
// current event to produce the next state. This reducer will be used
// to map over a set of events for a given aggregate
function reducer (previousState = {}, event) {
  const { eventType, data } = event

  switch (eventType) {
  case 'acct:created':
    return { ...data, balance: 0 }
  case 'acct:deposit':
    return {
       ...previousState,
       balance: previousState.balance + data.amount
    }
  case 'acct:withdrawal':
    return {
       ...previousState,
       balance: previousState.balance + data.amount
    }
  }
  default:
    return previousState
  }
}

const adapter = new InMemory()
const { dispatch, getState } = createStore(adapter, reducer)

module.exports = { dispatch, getState }
```

### dispatch

A function for dispatching events which takes a single event, or array of event objects.

```js
dispatch({
  eventType: 'account:create'
  aggregateId: 'account:1234',
  aggregateVersion: 0,
  data: {
    owner: {
      email: 'owner@example.com',
      phone: {
        type: 'cell'
        number: '+15628675309'
      }
    }
    createdAt: Date.now(),
  }
})
```

### getState

Get the state of an aggreaget.

```js
getState('account:1234')
```

## TODOs

1. Add **couchdb** adpater
1. Add **subscribe / unsubscribe** methods to **store**
1. Add **postgres** adapter
1. Implement **snapshots**
1. More examples
1. Monitoring / management UI
