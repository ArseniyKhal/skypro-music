import { Centerblock } from '../../components/Centerblock/Centerblock'
import { useGetFavoriteTracksQuery } from '../../services/servicesApi'

export const Favorites = () => {
  const { data, isLoading } = useGetFavoriteTracksQuery()

  return <Centerblock tracks={data} isLoading={isLoading} title="Мои треки" />
}
