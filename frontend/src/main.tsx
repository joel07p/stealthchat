import { ThemeProvider } from "@/components/theme-provider"
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from "./router/router"
import { setupAxiosClient } from "./service/axios-client"
import { getData, setData } from "./service/storage"

export const App = () => {
  useEffect(() => {
    setupAxiosClient()
    setData("sui", "sui")
    console.log(getData("sui"))
  }, [])

  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)