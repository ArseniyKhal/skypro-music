import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../context'

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const UserData = useContext(UserContext)
  if (!UserData.userDate.login) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
