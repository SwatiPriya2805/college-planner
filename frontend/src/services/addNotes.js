import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const addNotes= (credentials ) => {
    return axios.post(
        `${config.apiBaseUrl}/api/department/notes`,
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
