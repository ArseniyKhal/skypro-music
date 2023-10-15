import { MusicFilter } from '../MusicFilter/MusicFilter'
import { Playlist } from '../Playlist/Playlist'
import { useGetTracksQuery } from '../../services/servicesApi'

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

  return (
    <>
      <h2 style={titleStyle}>Треки</h2>
      <MusicFilter />
      <Playlist tracks={data} isLoading={isLoading} error={error} />
    </>
  )
}
