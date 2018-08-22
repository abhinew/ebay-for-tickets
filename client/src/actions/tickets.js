export const UPDATE_TICKET = 'UPDATE_TICKET';

export const updateTicket = (updatedTicket, ticketId) => {
    return {
        type: UPDATE_TICKET,
        payload: {
            updatedTicket : updatedTicket,
            ticketId: ticketId
        }
    }
}

 