import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_GAME = 'UPDATE_GAME'
export const UPDATE_GAMES = 'UPDATE_GAMES'

const updateEvents = games => ({
  type: UPDATE_GAMES,
  payload: games
})

export const addEvent = event => ({
  type: ADD_EVENT,
  payload: event
})




export const getEvents = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateEvents(result.body)))
    .catch(err => console.error(err))
}


export const createEvent = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(addEvent(result.body)))
    .catch(err => console.error(err))
}

