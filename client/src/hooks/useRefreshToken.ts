import axios from '../api/axios';

const useRefreshToken = () => {

    const refresh = async () => {
        try{
            // this calls a route on the server that refreshes the access token if valid refresh token is provided through http-only cookie
            const response = await axios.get('/api/v1/refresh_token', {
                withCredentials: true,
            });
            console.log("Response from useRefreshToken: ", response);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            console.log("Access Token from useRefreshToken", accessToken);

            return {accessToken, refreshToken};

        } catch (error) {
            console.error(error);
            const accessToken = null;
            const refreshToken = null;
            return {accessToken, refreshToken};
            console.log("Access Token from useRefreshToken", accessToken);
        }
    }
  return refresh;
}

export default useRefreshToken;

