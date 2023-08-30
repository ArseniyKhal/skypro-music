import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/not-found/NotFound'
import Main from './pages/main-page/MainPage'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/" element={<Main />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
