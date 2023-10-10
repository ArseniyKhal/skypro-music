// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux/es/hooks/useSelector'
import {
  //  useGetFavoriteTracksQuery,
  useGetTracksQuery,
} from '../../services/servicesApi'
import { Playlist } from '../../components/Playlist/Playlist'
// import { refreshToken } from '../../api'
// import { refreshTokenSelector } from '../../store/selectors/authSelectors'

export const Favorites = async () => {
  const { data, isLoading } = useGetTracksQuery()
  //   const refToken = useSelector(refreshTokenSelector)
  //   const navigate = useNavigate()
  //   const {
  //     data,
  //     isLoading,
  //     // , isError
  //   } = useGetFavoriteTracksQuery()
  //   if (isError) {
  //     //  refreshToken(refToken).then((response) => {
  //     //    console.log(response)
  //     //  })
  //     navigate('/login')
  //   }

  return (
    <>
      <h2
        style={{
          fontStyle: 'normal',
          fontWeight: ' 400',
          fontSize: '64px',
          lineHeight: ' 72px',
          letterSpacing: '-0.8px',
          marginBottom: '45px',
        }}
      >
        Мои треки
      </h2>
      <Playlist tracks={data} isLoading={isLoading} />
    </>
  )
}
