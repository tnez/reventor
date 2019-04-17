module.exports = class InMemory {
  constructor(initialEvents = []) {
    this.events = initialEvents
  }

  async read(aggregateId) {
    return this.events.filter(evt => evt.aggregateId === aggregateId)
  }

  async write(events) {
    this.events.push(...events)
  }
}
