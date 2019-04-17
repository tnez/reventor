const InMemory = require('..')

const factory = require('../../__factories__')

const events = [
  factory.event({
    aggregateId: 'account:1234',
    aggregateVersion: 0,
    correlationId: 'a-uuid-1',
    eventType: 'account:created',
  }),
  factory.event({
    aggregateId: 'account:1234',
    aggregateVersion: 1,
    correlationId: 'a-uuid-2',
    data: {
      amount: 100,
    },
    eventType: 'account:deposit',
  }),
  factory.event({
    aggregateId: 'account:9999',
    aggregateVersion: 0,
    correlationId: 'a-uuid-3',
    eventType: 'account:created',
  }),
]

describe('read', () => {
  const store = new InMemory(events)

  it('returns events for aggregate id', async () => {
    const result = await store.read('account:1234')
    expect(result).toMatchSnapshot()
  })
})

describe('write', () => {
  const store = new InMemory()

  let result
  beforeAll(async done => {
    result = await store.write(events)
    done()
  })

  it('resolves to undefined', () => {
    expect(result).toBeUndefined()
  })

  it('updates events acordingly', () => {
    expect(store.events).toStrictEqual(events)
  })
})
