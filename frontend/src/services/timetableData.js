import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const fetchTimetableData= () => {
    return axios.get(
        `${config.apiBaseUrl}/api/department/timetable`,
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