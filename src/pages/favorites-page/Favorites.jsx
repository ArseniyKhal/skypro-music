import { useGetFavoriteTracksQuery } from '../../services/servicesApi'
import { Playlist } from '../../components/Playlist/Playlist'

export const Favorites = () => {
  const { data, isLoading } = useGetFavoriteTracksQuery()

  return <Centerblock tracks={data} isLoading={isLoading} title="Мои треки" />
}
