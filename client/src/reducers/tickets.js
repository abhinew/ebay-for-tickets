import { GET_TICKETS, UPDATE_TICKET } from "../actions/tickets";
let initialState = {
};

export default (state = initialState, { type, payload}) => {
    let newState = {...state};
    switch (type) {
        case GET_TICKETS:
            newState[payload.event_id] = payload.tickets;
            let risks = {};
            payload.risks.forEach(function (risk) {
                risks[risk.id] = risk.risk;
            })
            newState[payload.event_id].forEach(function(ticket) {
                ticket.risk = risks[ticket.ticket_id];
            });
            return newState;
        case UPDATE_TICKET:          
            let index = newState[payload.eventId].findIndex(ticket => ticket.ticket_id === payload.ticketId)
            newState[payload.eventId][index] = { ...newState[payload.eventId][index],
                price : payload.updatedTicket.price,
                description : payload.updatedTicket.description,
            }
            
            return newState;     
        default:
            return state;    
    }
    
}
