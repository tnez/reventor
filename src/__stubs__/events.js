module.exports = [
  {
    aggregateId: 'acct:1',
    aggregateVersion: 0,
    data: {
      foo: 'baz',
      name: 'an account',
    },
    eventType: 'acct:created',
  },
  {
    aggregateId: 'acct:1',
    aggregateVersion: 1,
    data: { amount: 50 },
    eventType: 'acct:deposit',
  },
  {
    aggregateId: 'acct:2',
    aggregateVersion: 0,
    data: {
      foo: 'baz',
      name: 'another account',
    },
    eventType: 'acct:created',
  },
  {
    aggregateId: 'acct:1',
    aggregateVersion: 2,
    data: { amount: 25 },
    eventType: 'acct:withdrawal',
  },
]
