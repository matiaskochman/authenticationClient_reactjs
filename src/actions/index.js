import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signInUser({email,password}){

  return function(dispatch){
    // Submit email, password to the server

    axios.post(`${ROOT_URL}/signin`,{email: email,password: password});

    // If request is good...
    // - Update the state to indicate user is authenticated
    // - Save the JWT token
    // - redirect to the route '/feature'

    // If reques is bad...
    // - Show an error to the user

  }
}
