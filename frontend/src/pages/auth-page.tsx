import { login, register } from "@/api/auth.requests"
import { SignInCard } from "@/components/cards/signin-card"
import { SignUpCard } from "@/components/cards/signup-card"
import { useAuth } from "@/components/provider/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"

export const AuthenticationPage = () => {
    const { setSignedInState } = useAuth()
    const navigate = useNavigate()

    const handleLogin = (username: string, password: string) => {
        login({ username, password }, setSignedInState, navigate)
    }

    const handleRegister = (username: string, password: string, email: string) => {
        register({ username, email, password })
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <SignInCard
                        onSubmit={handleLogin}
                    />
                </TabsContent>
                <TabsContent value="register">
                    <SignUpCard onSubmit={handleRegister} />
                </TabsContent>
            </Tabs>
        </div>
    )
}