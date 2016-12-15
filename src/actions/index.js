import axios from 'axios';

export const SIGNIN = 'SIGNIN';
export const SIGNUP = 'SIGNUP';

const ROOT_URL = 'http://localhost:3090';

export function signin(){
    const request = axios.get(`${ROOT_URL}/signin`);
    console.log('signin');
    return {
      type: SIGNIN,
      payload:request
    };
}
