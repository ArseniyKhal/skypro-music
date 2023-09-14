import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  if (localStorage.getItem('user') === null) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
