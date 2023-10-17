import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { MusicFilter } from '../MusicFilter/MusicFilter'
import { Playlist } from '../Playlist/Playlist'
import { useGetTracksQuery } from '../../services/servicesApi'
import { addPlaylist } from '../../store/actions/creators/audioplayerCreator'
import { playListSelector } from '../../store/selectors/audioplayerSelectors'

const titleStyle = {
  fontStyle: 'normal',
  fontWeight: ' 400',
  fontSize: '64px',
  lineHeight: ' 72px',
  letterSpacing: '-0.8px',
  marginBottom: '45px',
}

export const MainTrackList = () => {
  const { data, isLoading, error } = useGetTracksQuery()
  const dispatch = useDispatch()
  const playlistData = useSelector(playListSelector)

  useEffect(() => {
    dispatch(addPlaylist(data))
  }, [data])

  return (
    <>
      <h2 style={titleStyle}>Треки</h2>
      <MusicFilter />
      <Playlist tracks={playlistData} isLoading={isLoading} error={error} />
    </>
  )
}
