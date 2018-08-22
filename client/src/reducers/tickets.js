let initialState = [
    {
        ticket_id: 1,
        event_id: 2,
        price: 130,
        author: "Rick",
        risk_percent: 32,
        description: "This ticket is not refundable",
        image_url: "https://theeventscalendar.com/content/uploads/2015/12/Screen-Shot-2015-12-02-at-12.59.45-PM.png"
    },
    {
        ticket_id: 2,
        event_id: 3,
        price: 130,
        author: "Rick",
        risk_percent: 32,
        description: "This ticket is not refundable",
        image_url: "https://theeventscalendar.com/content/uploads/2015/12/Screen-Shot-2015-12-02-at-12.59.45-PM.png"
    },
    {
        ticket_id: 3,
        event_id: 2,
        price: 130,
        author: "Rick",
        risk_percent: 32,
        description: "This ticket is not refundable",
        image_url: "https://theeventscalendar.com/content/uploads/2015/12/Screen-Shot-2015-12-02-at-12.59.45-PM.png"
    },
    {
        ticket_id: 4,
        event_id: 5,
        price: 130,
        author: "Rick",
        risk_percent: 32,
        description: "This ticket is not refundable",
        image_url: "https://theeventscalendar.com/content/uploads/2015/12/Screen-Shot-2015-12-02-at-12.59.45-PM.png"
    },
    {
        ticket_id: 5,
        event_id: 1,
        price: 130,
        author: "Rick",
        risk_percent: 32,
        description: "This ticket is not refundable",
        image_url: "https://theeventscalendar.com/content/uploads/2015/12/Screen-Shot-2015-12-02-at-12.59.45-PM.png"
    },
    {
        ticket_id: 6,
        event_id: 3,
        price: 130,
        author: "Rick",
        risk_percent: 32,
        description: "This ticket is not refundable",
        image_url: "https://theeventscalendar.com/content/uploads/2015/12/Screen-Shot-2015-12-02-at-12.59.45-PM.png"
    },
    {
        ticket_id: 7,
        event_id: 1,
        price: 130,
        author: "Rick",
        risk_percent: 32,
        description: "This ticket is not refundable",
        image_url: "https://theeventscalendar.com/content/uploads/2015/12/Screen-Shot-2015-12-02-at-12.59.45-PM.png"
    }
];


export default (state = initialState, { type, payload}) => {
    let newState = state.slice();
    switch (type) {
        case 'UPDATE_TICKET':
            let ticket = newState.find((ticket) => ticket.ticket_id === payload.ticketId)
            if (payload.updatedTicket.description)  {
                ticket.description = payload.updatedTicket.description;
            }
            if (payload.updatedTicket.price) {
                ticket.price = payload.updatedTicket.price;
            }
            if(payload.updatedTicket.image_url) {
                ticket.image_url = payload.updatedTicket.image_url;
            }
          
            return newState
        default:
            return state;    
    }
    
}
