import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const fetchNotesData= () => {
    return axios.get(
        `${config.apiBaseUrl}/api/department/notes`,
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
