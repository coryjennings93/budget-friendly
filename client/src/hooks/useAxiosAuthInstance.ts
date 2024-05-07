// this hook is used just to attach the axios interceptors to the axiosAuthInstance
import { axiosAuthInstance } from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

const useAxiosAuthInstance = () => {
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
                        const newAccessToken = await refresh();

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