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
            let currentTicket = newState[payload.eventId].find(ticket => ticket.ticket_id === payload.ticketId)
            currentTicket.price = payload.updatedTicket.price;
            currentTicket.description = payload.updatedTicket.description;
            currentTicket.image_url = payload.updatedTicket.image_url;
            return newState;     
        default:
            return state;    
    }
    
}
