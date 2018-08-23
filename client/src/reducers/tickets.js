import { GET_TICKETS } from "../actions/tickets";

let initialState = {
};

export default (state = initialState, { type, payload}) => {
    let newState = {...state};
    switch (type) {
        case GET_TICKETS:
            newState[payload.event_id] = payload.tickets;
            return newState;
        default:
            return state;    
    }
    
}
