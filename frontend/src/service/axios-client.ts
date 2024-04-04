import axios, { AxiosError } from "axios"
import { deleteData, getData } from "./storage"
import { useNavigate } from "react-router-dom"

export const setupAxiosClient = () => {
    //axios.defaults.url = `http://${process.env.SERVER_IP}`

    axios.interceptors.request.use(config => {
        if((config.url !== 'auth/signin') && (config.url !== 'auth/signup')) {
            const accessToken = getData('accessToken')
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
        }, (error) => {
            return Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        res => {
            return res
        },
        async (error: AxiosError) => {
            const httpStatus = error.response?.status
            if(httpStatus === 401 || httpStatus === 403) {
                deleteData('accessToken')
                deleteData('refreshToken')
                const navigate = useNavigate()
                navigate('/auth')
            }
        }
    )
}