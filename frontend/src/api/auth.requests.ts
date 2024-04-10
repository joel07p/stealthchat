import { getData, setData } from "@/service/storage"
import { handleRequestError } from "@/utils/helpers/handle-request-error"
import { Credentials, OTPCredentials, RegisterCredentials } from "@/utils/types"
import axios, { AxiosResponse } from "axios"
import { NavigateFunction } from "react-router-dom"
import { toast } from "sonner"

type SetSignedInStateCallback = (state: boolean) => void;

export const login = async (credentials: Credentials, setSignedInState: SetSignedInStateCallback, navigate: NavigateFunction) => {
    try {
        const response: AxiosResponse = await axios.post('auth/signin', credentials)

        const { data, status } = response

        if(status >= 200 && status < 300) {
            setData("accessToken", data.accessToken)
            setData("refreshToken", data.refreshToken)
            setSignedInState(true)
            toast.success("User logged in")
            navigate("/")

            console.log("User logged in")
        }

    } catch(error) {
        handleRequestError(error)
    }
}

export const sendOTP = async () => {
    try {
        await axios.get('auth/otp/send')
    } catch(error) {
        console.log(error)
    }
}

export const otpLogin = async (credentials: OTPCredentials, setSignedInState: SetSignedInStateCallback, navigate: NavigateFunction) => {
    try {
        const response: AxiosResponse = await axios.post('auth/otp/verify', credentials)

        const { data, status } = response

        if(status >= 200 && status < 300) {
            setData("accessToken", data.accessToken)
            setData("refreshToken", data.refreshToken)
            setSignedInState(true)
            navigate("/")

            console.log("User logged in")
        }

    } catch(error) {
        handleRequestError(error)
    }
}

export const register = async (credentials: RegisterCredentials) => {
    try {
        const response: AxiosResponse = await axios.post('auth/signup', credentials)

        const { data } = response

        if(!data) {
            toast.error("User not created")
            return false
        }

        return true

    } catch(error) {
        handleRequestError(error)
    }
}

export const logout = async (navigate: NavigateFunction) => {
    try {
        const refreshToken = getData('refreshToken')
        await axios.post('auth/logout', { refreshToken })
        navigate('/auth')
        toast.info("User logged out")
    } catch(error) {
        console.log(error)
    }
}