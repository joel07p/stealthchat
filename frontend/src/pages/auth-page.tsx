import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const AuthenticationPage = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                    <CardHeader>
                        <CardTitle>Signin</CardTitle>
                        <CardDescription>
                            Enter your Username and Password to continue. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" defaultValue="@peduarte" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Login</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="register">
                    <Card>
                    <CardHeader>
                        <CardTitle>Signup</CardTitle>
                        <CardDescription>
                            Enter your Email, Username and Password to sign up.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="pedro.duarte@gmail.com" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" defaultValue="@peduarte" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Register</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}