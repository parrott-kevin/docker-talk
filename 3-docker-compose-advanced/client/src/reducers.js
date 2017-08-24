import { combineReducers } from 'redux'
import * as ActionTypes from './actions'

export function appConfig (state = {
  DP_API_HOST
}, action) {
  return state
}

export function serverError (state = {
  ok: true,
  status: 200,
  message: '',
  friendly: ''
}, action) {
  switch (action.type) {
    case ActionTypes.SERVER_ERROR:
      const { ok, status, message } = action
      return Object.assign({}, state, {
        ok,
        status,
        message,
        friendly: 'DTE is experiencing issues, please try again later'
      })
    case ActionTypes.REQUEST_TOP_STORY_ID:
    case ActionTypes.REQUEST_STORY:
    case ActionTypes.REQUEST_SERVER_STATUS:
      return Object.assign({}, state, {
        ok: true,
        status: 200,
        message: '',
        friendly: ''
      })
    default:
      return state
  }
}

export function topStoryId (state = '', action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TOP_STORY_ID:
      return action.response
    default:
      return state
  }
}

export function story (state = { id: undefined }, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_STORY:
      return action.response
    default:
      return state
  }
}

export function serverStatus (state = { message: '' }, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_SERVER_STATUS:
      return action.response
    default:
      return state
  }
}

const rootReducer = combineReducers({
  topStoryId,
  story,
  serverStatus
})

export default rootReducer
