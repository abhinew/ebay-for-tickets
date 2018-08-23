import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_EVENTS = 'UPDATE_EVENTS'

const updateEvents = events => {
  return {
    type: UPDATE_EVENTS,
    payload: events
  }
}
 
export const addEvent = event => {
  return {
  type: ADD_EVENT,
  payload: event
  }
}
  




export const getEvents = () => (dispatch, getState) => {
  console.log("getEvents")
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/allevents`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateEvents(result.body)))
    .catch(err => console.error(err))
}


export const createEvent = (event) => (dispatch, getState) => {
  console.log(event);
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  return request
    .post(`${baseUrl}/events`)
    .send(event)
    .set('Authorization', `Bearer ${jwt}`) 
    .then(result => dispatch(addEvent(result.body)))
    .catch(err => console.error(err))
}

