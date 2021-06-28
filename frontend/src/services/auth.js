import axios from 'axios';
import config from '@/config.production'
import { successHandler, errorHandler } from './helper';

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';

// credentials = { email: string, password: string }
const login = ( credentials ) => {
    return axios.post(
        `http://localhost:3000/auth/login`,
        credentials,
        {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            },
            withCredentials: false
        }
    )
    .then(successHandler)
    .catch( errorHandler );
};

const signUp = ( credentials ) => {
    return axios.post(
        `${config.apiBaseUrl}/auth/register`, credentials,
        {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            },
            withCredentials: false
        }
    )
        .then( successHandler )
        .then( data => {
            const { token, email } = data

            localStorage.setItem( KEY_TOKEN, token );
            localStorage.setItem( KEY_EMAIL, JSON.stringify( email ) );
            return email;
        })
        .catch( errorHandler );
};


export const logout = () => {
    localStorage.removeItem( KEY_TOKEN );
    localStorage.removeItem( KEY_EMAIL );
};

const getEmail = () => {
    return JSON.parse( localStorage.getItem( KEY_EMAIL ) );
};

const getToken = () => {
    return localStorage.getItem( KEY_TOKEN );
};

export {
    login,
    signUp,
    getToken,
    getEmail
};