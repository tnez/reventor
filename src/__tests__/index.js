const { createStore } = require('../index')
const stubbed = require('../__stubs__')

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
  let es
  const mockRead = jest.fn(id =>
    stubbed.events.filter(evt => evt.aggregateId === id),
  )
  const mockReducer = jest.fn((prevState, evt) => {
    const { aggregateId, data, eventType } = evt
    switch (eventType) {
      case 'acct:created':
        return { aggregateId, amount: 0, ...data }
      case 'acct:deposit':
        return { ...prevState, amount: prevState.amount + data.amount }
      case 'acct:withdrawal':
        return { ...prevState, amount: prevState.amount - data.amount }
      default:
        return prevState
    }
  })

  beforeEach(() => {
    es = createStore({ read: mockRead }, mockReducer)
  })

  it('calls the reducer with the correct events', async done => {
    const result = await es.getState('acct:1')

    expect(mockRead).toBeCalledWith('acct:1')

    const aggregateEvents = stubbed.events.filter(
      evt => evt.aggregateId === 'acct:1',
    )
    aggregateEvents.forEach((evt, idx) => {
      expect(mockReducer).toHaveBeenNthCalledWith(
        idx + 1,
        expect.any(Object),
        evt,
        idx,
        aggregateEvents,
      )
    })

    expect(result).toStrictEqual({
      aggregateId: 'acct:1',
      amount: 25,
      foo: 'baz',
      name: 'an account',
    })

    done()
  })
})
