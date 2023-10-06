import { Playlist } from '../../components/Playlist/Playlist'
import { useGetTracksQuery } from '../../services/servicesApi'

export const Favorites = () => {
  const { isLoading } = useGetTracksQuery()

  return isLoading ? <h3>Загрузка</h3> : <Playlist />
}
