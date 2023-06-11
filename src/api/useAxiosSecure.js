import axios from "axios";
import { useEffect } from "react";
import useAuth from "../component/useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
});

export const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('token_access');
            if (token) {
                config.headers.Authorization = `bearer ${token}`
            }
            return config;
        })
        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response &&
                    (error.response.status === 401 || error.response.status === 403)) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        )
    }, [logOut, navigate])
    return [axiosSecure];
}