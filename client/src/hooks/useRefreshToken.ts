import { useAuth } from '@/context/AuthContext';

const useRefreshToken = () => {
    const {setUser} = useAuth();

    const refresh = async () => {
        try{
            const response = await fetch('http://localhost:4000/api/v1/refresh_token', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            if (response.ok) {
                const json = await response.json();
                console.log("returned json: ", json);
                const accessToken = json.accessToken;
                setUser(prev => {
                    console.log(JSON.stringify(prev));
                    console.log(json.accessToken);
                    return {...prev, accessToken};
                });
                return accessToken;
            } else {
                console.error('Failed to refresh token');
            }
        } catch (error) {
            console.error(error);
        }
    }
  return refresh;
}

export default useRefreshToken;

