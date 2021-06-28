//fetchEventsByName -> get only that club which is passed
import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const fetchEventsByName= (name) => {
    return axios.get(
        `${config.apiBaseUrl}/api/club/${name}`,
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