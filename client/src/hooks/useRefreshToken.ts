import { useAuth } from '@/context/AuthContext';
import axios from '../api/axios';

const useRefreshToken = () => {
    const {setAccessToken} = useAuth();

    const refresh = async () => {
        try{
            const response = await axios.get('/api/v1/refresh_token', {
                withCredentials: true,
            });
            const accessToken = response.data.accessToken;
            setAccessToken(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return {...prev, accessToken};
            });
            return accessToken;

        } catch (error) {
            console.error(error);
        }
    }
  return refresh;
}

export default useRefreshToken;

