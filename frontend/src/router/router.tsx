import { ProtectedRoute } from '@/components/protected-route'
import { AuthenticationPage } from '@/pages/auth-page'
import { ChatPage } from '@/pages/chat-page'
import { GroupPage } from '@/pages/group-page'
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
        element:
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
    },
    {
        path: '/group/:groupId',
        element:
            <ProtectedRoute>
                <GroupPage />
            </ProtectedRoute>,
        children: [
            {
                path: 'room/:roomId',
                element: <ChatPage />
            }
        ]
    },
    {
        path: '/landing',
        element: 
            <ProtectedRoute>
                <LandingPage />
            </ProtectedRoute>
    }
])