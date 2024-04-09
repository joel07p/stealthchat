import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/provider/auth-provider'
import { ThemeProvider } from './components/provider/theme-provider'
import './index.css'
import { router } from "./router/router"
import { setupAxiosClient } from "./service/axios-client"

export const App = () => {
  useEffect(() => {
    setupAxiosClient()
  }, [])

  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)