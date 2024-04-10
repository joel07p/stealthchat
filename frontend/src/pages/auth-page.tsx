import { login, register } from "@/api/auth.requests"
import { SignInCard } from "@/components/cards/signin-card"
import { SignUpCard } from "@/components/cards/signup-card"
import { useAuth } from "@/components/provider/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AuthenticationPage = () => {
    const { setSignedInState } = useAuth()
    const navigate = useNavigate()
    const [openedTab, setOpenedTab] = useState("login")

    const handleLogin = (username: string, password: string) => {
        login({ username, password }, setSignedInState, navigate)
    }

    const handleRegister = async (username: string, password: string, email: string) => {
        const userCreated = await register({ username, email, password })
        if(userCreated) setOpenedTab("login")
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <Tabs value={openedTab} onValueChange={setOpenedTab} className="w-[400px]">
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