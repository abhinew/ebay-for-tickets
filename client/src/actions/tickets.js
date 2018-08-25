import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'
import * as request from 'superagent'


export const UPDATE_TICKET = 'UPDATE_TICKET';
export const GET_TICKETS = 'GET_TICKETS';

const updateTicket = (updatedTicket, ticketId, eventId) => {
    return {
        type: UPDATE_TICKET,
        payload: {
            updatedTicket : updatedTicket,
            ticketId: ticketId,
            eventId: eventId
        }
    }
}


const saveTickets = (id, body) => {
    
    return {
        type: GET_TICKETS,
        payload: {
            event_id: id,
            tickets: body.tickets,
            risks: body.risks
        }
    }
}

export const createTicket = (ticket) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
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
  

  export const editTicket = (updatedTicket, ticketId, eventId) => (dispatch, getState) => {
      console.log(updatedTicket);
      const state = getState();
      const jwt = state.currentUser.jwt

      if (isExpired(jwt)) return dispatch(logout())
    
      request
        .patch(`${baseUrl}/tickets/${ticketId}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send({ updatedTicket })
        .then(_ => dispatch(updateTicket(updatedTicket, ticketId, eventId)))
        .catch(err => console.error(err))

  }