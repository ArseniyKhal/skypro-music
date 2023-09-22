import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../context'

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  const UserData = useContext(UserContext)
  console.log(UserData.isLogin)

  //   if (localStorage.getItem('user') === null) {
  if (!UserData.isLogin) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}
