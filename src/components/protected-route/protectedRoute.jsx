import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ redirectPath = '/login' }) {
  if (document.cookie.indexOf('user')) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
