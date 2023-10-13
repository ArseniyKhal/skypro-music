import { useGetFavoriteTracksQuery } from '../../services/servicesApi'
import { Playlist } from '../../components/Playlist/Playlist'

const titleStyle = {
  fontStyle: 'normal',
  fontWeight: ' 400',
  fontSize: '64px',
  lineHeight: ' 72px',
  letterSpacing: '-0.8px',
  marginBottom: '45px',
}
export const Favorites = () => {
  const { data, isLoading, error } = useGetFavoriteTracksQuery()
  return (
    <>
      <h2 style={titleStyle}>Мои треки</h2>
      <Playlist
        tracks={data}
        isLoading={isLoading}
        error={error}
        showAllTracksAsLiked
      />
    </>
  )
}
