import 'whatwg-fetch'

function checkResponseJSON (response) {
  if (!response.ok) {
    let err = new Error(response.statusText)
    err.ok = response.ok
    err.status = response.status
    throw err
  } else {
    return response.text().then(text => {
      const result = text ? JSON.parse(text) : { results: [] }
      return result
    })
  }
}

export const SERVER_ERROR = 'SERVER_ERROR'
export function serverError ({ ok, status, message }) {
  return {
    type: SERVER_ERROR,
    ok,
    status,
    message
  }
}

function request (type, path) {
  return {
    type,
    path
  }
}

function receive (type, path, response) {
  return {
    type,
    path,
    response,
    receivedAt: (new Date()).toJSON().toString()
  }
}

export const REQUEST_TOP_STORY_ID = 'REQUEST_TOP_STORY_ID'
export const RECEIVE_TOP_STORY_ID = 'RECEIVE_TOP_STORY_ID'
function getTopStoryId () {
  return dispatch => {
    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    dispatch(request(REQUEST_TOP_STORY_ID, url))
    return fetch(url)
      .then(checkResponseJSON)
      .then(json => {
        dispatch(receive(RECEIVE_TOP_STORY_ID, url, json[0]))
      })
      .catch(err => {
        dispatch(serverError(err))
      })
  }
}

export const REQUEST_STORY = 'REQUEST_STORY'
export const RECEIVE_STORY = 'RECEIVE_STORY'
export function getHackerNewsTopStory () {
  return (dispatch, getState) => {
    return dispatch(getTopStoryId()).then(() => {
      const storyId = getState().topStoryId
      const url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
      dispatch(request(REQUEST_STORY, url))
      return fetch(url)
        .then(checkResponseJSON)
        .then(json => {
          dispatch(receive(RECEIVE_STORY, url, json))
        })
        .catch(err => {
          dispatch(serverError(err))
        })
    })
  }
}

export const REQUEST_SERVER_STATUS = 'REQUEST_SERVER_STATUS'
export const RECEIVE_SERVER_STATUS = 'RECEIVE_SERVER_STATUS'
export function getServerStatus () {
  return dispatch => {
    return dispatch(getTopStoryId()).then(() => {
      const url = `${DP_API_HOST}/api/status`
      dispatch(request(REQUEST_SERVER_STATUS, url))
      return fetch(url)
        .then(checkResponseJSON)
        .then(json => {
          dispatch(receive(RECEIVE_SERVER_STATUS, url, json))
        })
        .catch(err => {
          dispatch(serverError(err))
        })
    })
  }
}
