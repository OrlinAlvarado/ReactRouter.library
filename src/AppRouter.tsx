import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { AuthLayout } from "./auth/layout/AuthLayout"
import { LoginPage } from "./auth/pages/LoginPage"
import { RegisterPage } from "./auth/pages/RegisterPage"
import ChatPage from "./chat/pages/ChatPage"
import { sleep } from "./lib/sleep"

const ChatLayout = lazy(async () => {
    await sleep(1500)
    return import("./chat/layout/ChatLayout")
})

export const AppRouter = () => {
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
                        <ChatLayout />
                    </Suspense>
                }>
                    <Route index element={<ChatPage />} />
                </Route>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </BrowserRouter>
    )
}