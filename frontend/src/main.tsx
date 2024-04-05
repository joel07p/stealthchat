import { ThemeProvider } from "@/components/theme-provider"
import axios from "axios"
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from "./router/router"
import { setupAxiosClient } from "./service/axios-client"

export const App = () => {
  useEffect(() => {
    setupAxiosClient()
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    signUp()
    signIn()
  }, [])

  const signUp = async () => {
    await axios.post('http://locahost:3300/auth/signup', {
      username: "Test11",
      email: "Test11@gmail.com",
      password: "123"
    })
  }
  const signIn = async () => {
    const res = await axios.post('http://locahost:3300/auth/signin', {
      username: "Test11",
      password: "123"
    })

    console.log(res)
  }

  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)