// this hook is used just to attach the axios interceptors to the axiosAuthInstance
import { axiosAuthInstance } from "@/api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "@/context/AuthContext";


const useAxiosAuthInstance = () => {
    // const { setAccessToken } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        // const requestInterceptor = axiosAuthInstance.interceptors.request.use(
        //     config => {
        //         if
        //     }
        // );

        const responseIntercept = axiosAuthInstance.interceptors.response.use(
            response => response, 
            async error => {
                const prevRequest = error?.config;
                if (error?.response?.status == 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        // access token is expired
                        const {accessToken, refreshToken} = await refresh();
                        // setAccessToken(() => accessToken);

                        return axiosAuthInstance(prevRequest);
                    } catch (error) {
                        console.log(error);
                        throw Error(error);
                    }
                }

            }
        );


        return () => {
            // axiosAuthInstance.interceptors.request.eject(requestIntercept);
            axiosAuthInstance.interceptors.response.eject(responseIntercept);
        };
    }, [refresh]);

    return axiosAuthInstance;
}

export default useAxiosAuthInstance;