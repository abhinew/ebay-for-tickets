import { GET_COMMENTS } from "../actions/comments";

export default (state = {}, {type, payload}) => {
    let newState = { ...state }
    switch (type) {
        case GET_COMMENTS:
         newState[payload.ticketId] = payload.comments;
         return newState;
        default:
         return state;
    }
}
