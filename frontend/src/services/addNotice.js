import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const addNotice= (credentials ) => {
    return axios.post(
        `${config.apiBaseUrl}/api/notice`,
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
