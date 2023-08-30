import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/not-found-page/NotFound'
import Main from './pages/main-page/MainPage'
import Login from './pages/login-page/Login'
import Register from './pages/register-page/Register'
import Favorites from './pages/favorites-page/Favorites'
import Category from './pages/category-pages/Category'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
