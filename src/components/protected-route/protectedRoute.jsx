import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../context'
// import { useSelector } from 'react-redux'
// import { logInSelector } from '../../store/selectors/authSelectors'

export const ProtectedRoute = ({ children, redirectPath = '/login' }) => {
  // используем useContext:
  const data = useContext(UserContext)
  if (!data.userData.login) {
    return <Navigate to={redirectPath} replace />
  }

  // используем state:
  //   const data = useSelector(logInSelector)
  //   if (!data) {
  //     return <Navigate to={redirectPath} replace />
  //   }

  return children
}
