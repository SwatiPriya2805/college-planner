import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const fetchDelete= (type,Id,action,credentials) => {
    axios.delete(
        `${config.apiBaseUrl}/api/${type}/${Id}?action=${action}`,
        credentials,
        {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Authorization': `${getToken()}`
            },
            withCredentials: false
        }
    )
        .then( response => response.data )
};
