const uuid = require('uuid/v4')

module.exports = (options = {}) => ({
  aggregateId: options.aggregateId || `root:${uuid()}`,
  aggregateVersion: options.aggregateVersion || 0,
  correlationId: options.correlationId || uuid(),
  data: options.data || {},
  eventType: options.eventType || 'root:event-type',
})
