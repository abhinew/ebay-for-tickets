import {ADD_EVENT, UPDATE_EVENTS} from '../actions/events'
import {USER_LOGOUT} from '../actions/users'

export default (state = [], {type, payload}) => {
    let newState = state.slice();
    switch (type) {
        case USER_LOGOUT:
          return null
        case ADD_EVENT:
          return newState.concat(payload)
        case UPDATE_EVENTS:
          return newState = payload.slice();
        default: 
        return state;
    }
}
