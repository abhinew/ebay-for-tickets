import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'
import * as request from 'superagent'


export const UPDATE_TICKET = 'UPDATE_TICKET';
export const GET_TICKETS = 'GET_TICKETS';

export const updateTicket = (updatedTicket, ticketId) => {
    return {
        type: UPDATE_TICKET,
        payload: {
            updatedTicket : updatedTicket,
            ticketId: ticketId
        }
    }
}


export const saveTickets = (id, tickets) => {
    
    return {
        type: GET_TICKETS,
        payload: {
            event_id: id,
            tickets: tickets
        }
    }
}

export const createTicket = (ticket) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())

    var event_id = ticket.event_id;
  
    return request
      .post(`${baseUrl}/ticket`)
      .send(ticket)
      .set('Authorization', `Bearer ${jwt}`)
      .catch(err => console.error(err))
}
  
 
export const getTickets = (id) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/tickets/${id}`)

      .set('Authorization', `Bearer ${jwt}`)
      .then(result => dispatch(saveTickets(id, result.body)))
      .catch(err => console.error(err))
  }
  