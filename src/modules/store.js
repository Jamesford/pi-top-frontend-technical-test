import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from './utils/logger'
import DevTool from './utils/DevTool'
import reducers from './reducers'

let finalCreateStore
if (process.env.NODE_ENV !== 'production') {
  finalCreateStore = compose(
    applyMiddleware(thunk, logger),
    DevTool.instrument()
  )(createStore)
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore)
}

const combinedReducer = combineReducers(reducers)
const store = finalCreateStore(combinedReducer)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept(() => store.replaceReducer(combineReducers(reducers)))
}

export default store
