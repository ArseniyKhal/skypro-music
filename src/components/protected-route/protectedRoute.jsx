import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const userInfo = JSON.parse(localStorage.getItem('userSkyproMusic'))
  if (!userInfo) {
    return <Navigate to={redirectPath} replace />
  }
  return children
}
