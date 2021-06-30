import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const fetchCalendarData= (date) => {
    return axios.get(
        `${config.apiBaseUrl}/api/calendar?date=${date}`,
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