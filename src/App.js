import { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard.tsx"
import Login from "./components/login/Login.js"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <div>
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && <Dashboard />}
    </div>
  )
}

export default App
