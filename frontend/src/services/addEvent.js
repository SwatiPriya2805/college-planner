import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const addEvent= (credentials, name ) => {
    return axios.post(
        `${config.apiBaseUrl}/api/club/${name}/add`,
        credentials,
        {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json',
                'Authorization': `${getToken()}`
            },
            withCredentials: false
        }
                
    )
        .then( response => response.data )
};
