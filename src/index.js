module.exports = {
  adapters: require('./adapters'),
  createStore,
}

/**
 * TODO: jsdocs
 * Create a Reventor Store
 *
 * @param {Adapter} adapter
 * @param {Reducer} reducer
 * @return {ReventorStore}
 */
function createStore(adapter, reducer) {
  return {
    dispatch: async events => {
      return adapter.write(Array.isArray(events) ? events : [events])
    },
    getState: async aggregateId => {
      const events = await adapter.read(aggregateId)
      return events.reduce(reducer, {})
    },
  }
}
