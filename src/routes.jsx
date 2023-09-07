import { Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/not-found-page/NotFound'
import { Main } from './pages/main-page/MainPage'
import { Login } from './pages/login-page/Login'
import { Register } from './pages/register-page/Register'
import { Favorites } from './pages/favorites-page/Favorites'
import { Category } from './pages/category-pages/Category'
import { ProtectedRoute } from './components/protected-route/protectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/category/:id"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
