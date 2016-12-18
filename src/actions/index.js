import axios from 'axios';
import { browserHistory } from 'react-router';
import {AUTH_USER, UNAUTH_USER ,AUTH_ERROR} from './types';
const ROOT_URL = 'http://localhost:3090';

export function signInUser({email,password}){

  // I'm using redux-thunk so we have a dispatch
  return function(dispatch){
    // Submit email, password to the server

    axios.post(`${ROOT_URL}/signin`,{email: email,password: password})
      .then(response => {
        // If request is good...
        // - Update the state to indicate user is authenticated
        dispatch({type: AUTH_USER});
        // - Save the JWT token
        localStorage.setItem('token',response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If reques is bad...
        // - Show an error to the user
        dispatch(authError(' Bad login info'));
      });

  }
}

export function signUpUser({email,password}){

  // I'm using redux-thunk so we have a dispatch
  return function(dispatch){
    // Submit email, password to the server

    axios.post(`${ROOT_URL}/signup`,{email: email,password: password})
      .then(response => {
        // If request is good...
        // - Update the state to indicate user is authenticated
        dispatch({type: AUTH_USER});
        // - Save the JWT token
        localStorage.setItem('token',response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch((errorMessage) => {
        // If reques is bad...
        // - Show an error to the user
        dispatch(authError(errorMessage.response.data.error));
      });

  }
}
export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signOutUser(){
  localStorage.removeItem('token');
  return {
    type:UNAUTH_USER
  };
}
