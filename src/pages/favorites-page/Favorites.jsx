import { useGetFavoriteTracksQuery } from '../../services/servicesApi'
import { Playlist } from '../../components/Playlist/Playlist'

export const Favorites = () => {
  const { data, isLoading } = useGetFavoriteTracksQuery()

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
