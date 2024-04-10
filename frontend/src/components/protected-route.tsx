import { PropsWithChildren, useEffect } from "react"
import { useAuth } from "./provider/auth-provider"
import { useNavigate } from "react-router-dom"

type ProtectedRouteProps = PropsWithChildren

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { signedIn } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!signedIn) {
            navigate('/auth', { replace: true })
        }
    }, [navigate, signedIn])
    
    return <>{signedIn ? children : null}</>;
}