import { useAuth } from '@/context/AuthContext';
import axios from '../api/axios';

const useRefreshToken = () => {

    const refresh = async () => {
        try{
            // this calls a route on the server that refreshes the access token
            const response = await axios.get('/api/v1/refresh_token', {
                withCredentials: true,
            });
            const accessToken = response.data.accessToken;

            return accessToken;

        } catch (error) {
            console.error(error);
        }
    }
  return refresh;
}

export default useRefreshToken;

