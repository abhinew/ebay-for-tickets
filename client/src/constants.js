export const baseUrl = process.env.REACT_APP_ENV === 'production' ? 'https://tickets-master.herokuapp.com' : 'http://localhost:4000'
console.log("process.env.REACT_APP_ENV", process.env.REACT_APP_ENV);
export const localStorageJwtKey = 'currentUserJwt'
