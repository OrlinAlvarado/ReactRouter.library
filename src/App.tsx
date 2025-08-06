import { AppRouter } from './AppRouter'
import { AuthLayout } from './auth/layout/AuthLayout'
import ChatLayout from './chat/layout/ChatLayout'
import ChatPage from './chat/pages/ChatPage'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
