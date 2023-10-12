// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { useGetFavoriteTracksQuery } from '../../services/servicesApi'
import { Playlist } from '../../components/Playlist/Playlist'
// import { refreshTokenSelector } from '../../store/selectors/authSelectors'
// import { refreshToken } from '../../api'

const titleStyle = {
  fontStyle: 'normal',
  fontWeight: ' 400',
  fontSize: '64px',
  lineHeight: ' 72px',
  letterSpacing: '-0.8px',
  marginBottom: '45px',
}
export const Favorites = () => {
  //   const navigate = useNavigate()
  //   const refToken = useSelector(refreshTokenSelector)
  const {
    data,
    isLoading,
    //  isError
  } = useGetFavoriteTracksQuery()
  //   if (isError) {
  //     navigate('/login')
  //     refreshToken(refToken)
  //   }
  return (
    <>
      <h2 style={titleStyle}>Мои треки</h2>
      <Playlist tracks={data} isLoading={isLoading} />
    </>
  )
}
