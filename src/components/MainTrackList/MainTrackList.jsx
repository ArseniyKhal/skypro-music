import { useDispatch } from 'react-redux'
import { Centerblock } from '../Centerblock/Centerblock'
import { useGetTracksQuery } from '../../services/servicesApi'
import { addPlaylist } from '../../store/actions/creators/audioplayerCreator'

export const MainTrackList = () => {
  const { data, isLoading } = useGetTracksQuery()
  const dispatch = useDispatch()
  dispatch(addPlaylist(data))

  return <Centerblock tracks={data} isLoading={isLoading} tetle="Треки" />
}
