export const ADD_COMMENT = 'ADD_COMMENT';

export const addComment = (comment, ticketId) => {
    return {
        type: ADD_COMMENT,
        payload: {
            comment: comment,
            ticketId: ticketId
        }
    }
}