import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_EVENT = 'ADD_EVENT'
export const FETCH_EVENTS = 'FETCH_EVENTS'

const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
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
  const state = getState()
  if (!state.currentUser) return null
   const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/allevents`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(fetchEvents(result.body)))
    .catch(err => console.error(err))
}


export const createEvent = (event) => (dispatch, getState) => {
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

