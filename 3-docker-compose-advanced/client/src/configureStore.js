import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers.js'

const loggerMiddleware = createLogger()

let configureStore
if (DP_NODE_ENV === 'development') {
  configureStore = function (preloadedState) {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    )
  }
} else {
  configureStore = function (preloadedState) {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware
      )
    )
  }
}

export default configureStore
