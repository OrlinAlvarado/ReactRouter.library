import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { AuthLayout } from "./auth/layout/AuthLayout"
import { LoginPage } from "./auth/pages/LoginPage"
import { RegisterPage } from "./auth/pages/RegisterPage"
import { sleep } from "./lib/sleep"
import { PrivateRoute } from "./auth/components/PrivateRoute"
import { checkAuth } from "./fake/fake-data"

const ChatLayout = lazy(async () => {
    await sleep(1500)
    return import("./chat/layout/ChatLayout")
})

const ChatPage = lazy(async () => import("./chat/pages/ChatPage"))
const NoChatSelectedPage = lazy(async () => import("./chat/pages/NoChatSelectedPage"))

export const AppRouter = () => {
    
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('No token found')
            }
            return checkAuth(token)
        },
        retry: false,
    })

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted-foreground border-t-primary" role="status">
                    <span className="sr-only">Cargando...</span>
                </div>
            </div>
        )
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />} >
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="/chat" element={
                    <Suspense fallback={
                        <>
                        <div className="flex min-h-screen items-center justify-center">
                            <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted-foreground border-t-primary" role="status">
                                <span className="sr-only">Cargando...</span>
                            </div>
                        </div>
                        </>
                    }>
                        <PrivateRoute isAuthenticated={!!user}>
                            <ChatLayout />
                        </PrivateRoute>
                    </Suspense>
                }>
                    <Route index element={<NoChatSelectedPage />} />
                    <Route path="/chat/:clientId" element={<ChatPage />} />
                </Route>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </BrowserRouter>
    )
}