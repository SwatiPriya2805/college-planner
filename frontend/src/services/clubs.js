import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const fetchClubs= () => {
    return axios.get(
        `${config.apiBaseUrl}/api/club`,
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