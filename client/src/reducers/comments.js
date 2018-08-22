
let initialState = [
    {
        
        text: "Good deal for the weekend. Couldn't find a better option for the weekend",
        ticket_id: 1,
        authorName: "Paul"
    },
    {
        
        text: "Don't buy this one. Quite expensive compared to other tickets",
        ticket_id: 3,
        authorName: "Sam"
    },
    {
        
        text: "Found this is the only available ticket",
        ticket_id: 1,
        authorName: "Henry"
    },
    {
        text: "Good ticket",
        ticket_id: 5,
        authorName: "Nick"
    },
    {
        text: "good deal in this summer",
        ticket_id: 5,
        authorName: "Ben"
    }
]
export default (state = initialState, {type, payload}) => {
    return state;
}
