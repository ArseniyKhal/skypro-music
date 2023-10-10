import { useDispatch } from 'react-redux'
import { MusicFilter } from '../MusicFilter/MusicFilter'
import { Playlist } from '../Playlist/Playlist'
import { useGetTracksQuery } from '../../services/servicesApi'

export const MainTrackList = () => {
  const { data, isLoading } = useGetTracksQuery()

  return <Centerblock tracks={data} isLoading={isLoading} title="Треки" />
}
