import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login.jsx'
import Reset from './Reset.jsx'
import Signup from './Signup.jsx'

const App = () => (
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/reset" element={<Reset />} />
    <Route path="*" element={<Navigate to="/signup" replace />} />
  </Routes>
)

export default App
