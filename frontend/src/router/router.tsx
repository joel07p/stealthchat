import { AuthenticationPage } from '@/pages/auth-page'
import { ChatPage } from '@/pages/chat-page'
import { HomePage } from '@/pages/home-page'
import { LandingPage } from '@/pages/landing-page'
import { createBrowserRouter } from 'react-router-dom'


export const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthenticationPage />
    },
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/group/:groupId/chat/:chatId',
        element: <ChatPage />
    },
    {
        path: '/landing',
        element: <LandingPage />
    }
])