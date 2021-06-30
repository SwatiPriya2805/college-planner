import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const fetchDeleteClub= (type,Id,action,name,credentials) => {
    axios.patch(
        `${config.apiBaseUrl}/api/${type}/${Id}?action=${action}&name=${name}`,
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
