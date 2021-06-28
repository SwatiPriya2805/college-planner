import axios from 'axios';
import config from '@/config.production';
import { getToken } from '@/services/auth';

export const fetchNoticeData= (searchDescription) => {
    if(searchDescription===null){
        return axios.get(
        `${config.apiBaseUrl}/api/notice`,
        {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Authorization': `${getToken()}`
            },
            withCredentials: false
        }
                
    )
        .then( response => response.data )
    }
    else{
          return axios.get(
        `${config.apiBaseUrl}/api/notice?search=${searchDescription}`,
        {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Authorization': `${getToken()}`
            },
            withCredentials: false
        }
                
    )
        .then( response => response.data )
    }
   
};
