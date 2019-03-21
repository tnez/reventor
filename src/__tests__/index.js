const { createStore } = require('../index.js')

describe('dispatch', () => {
  let es, adapter
  beforeEach(() => {
    adapter = { write: jest.fn() }
    es = createStore(adapter)
  })

  const validEventAttrs = {
    aggregateId: 'user:1234',
    aggregateType: 'user',
    eventType: 'user/set-email',
  }

  it('handles a single event', async () => {
    const singleEvent = {
      ...validEventAttrs,
      data: {
        email: 'email@example.com',
      },
    }

    await es.dispatch(singleEvent)
    expect(adapter.write).toHaveBeenCalledWith([singleEvent])
  })

  it('handles an array of events', async () => {
    const event1 = {
      ...validEventAttrs,
      data: { email: 'email@example.com' },
    }
    const event2 = {
      ...validEventAttrs,
      data: { email: 'another-email@example.com' },
    }

    await es.dispatch([event1, event2])
    expect(adapter.write).toHaveBeenCalledWith([event1, event2])
  })
})

describe('getState', () => {
  const mockedEvents = [
    {
      aggregateId: 'fish:1234',
      aggregateVersion: 0,
      data: {
        color: 'red',
        id: 'fish:1234',
      },
      eventType: 'fish:created',
    },
    {
      aggregateId: 'fish:1234',
      aggregateVersion: 1,
      data: { color: 'blue' },
      eventType: 'fish:updated',
    },
    {
      aggregateId: 'fish:1234',
      aggregateVersion: 2,
      eventType: 'fish:destroyed',
    },
  ]

  let es, adapter, reducer
  beforeEach(() => {
    adapter = { read: jest.fn(() => mockedEvents) }
    reducer = jest.fn()
    es = createStore(adapter, reducer)
  })

  it('calls the reducer the propper arguments', async () => {
    await es.getState('fish:1234')

    expect(adapter.read).toHaveBeenCalledWith('fish:1234')
    expect(reducer).toHaveBeenCalledWith({}, mockedEvents)
  })
})
