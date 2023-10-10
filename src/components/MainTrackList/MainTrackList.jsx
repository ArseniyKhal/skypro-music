import { useDispatch } from 'react-redux'
import { MusicFilter } from '../MusicFilter/MusicFilter'
import { Playlist } from '../Playlist/Playlist'
import { useGetTracksQuery } from '../../services/servicesApi'
import { addPlaylist } from '../../store/actions/creators/audioplayerCreator'

export const MainTrackList = () => {
  const { data, isLoading } = useGetTracksQuery()
  const dispatch = useDispatch()
  dispatch(addPlaylist(data))

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
        Треки
      </h2>
      <MusicFilter />
      <Playlist tracks={data} isLoading={isLoading} />
    </>
  )
}
