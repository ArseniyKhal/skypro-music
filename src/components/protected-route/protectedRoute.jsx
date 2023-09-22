import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../context'

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const data = useContext(UserContext)
  console.log(data)
  if (!data.userDate.login) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
