export default function logger(store) {
  return next => action => {
    console.groupCollapsed('Logger', action.type)
    console.log('before', store.getState())
    console.log('action', action)
    const result = next(action)
    console.log('after', store.getState())
    console.groupEnd()
    return result
  }
}
