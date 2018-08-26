import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'
import * as request from 'superagent'

export const GET_COMMENTS = 'GET_COMMENTS';


const fetchComments = (ticketId, body) => {
    return {
        type: GET_COMMENTS,
        payload: {
            ticketId: ticketId,
            comments: body
        }
    }
}

export const getComments = (ticketId) => (dispatch, getState) => {
    
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/comments/${ticketId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => dispatch(fetchComments(ticketId, result.body)))
      .catch(err => console.error(err))
}
  

export const createComment = (comment) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    return request
      .post(`${baseUrl}/comment`)
      .send(comment)
      .set('Authorization', `Bearer ${jwt}`)
      .catch(err => console.error(err))
}