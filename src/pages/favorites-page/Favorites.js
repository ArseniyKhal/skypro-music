import { useState } from 'react'
import { useGetFavoriteTracksQuery } from '../../services/servicesApi'
import { Playlist } from '../../components/Playlist/Playlist'
import { MusicFilter } from '../../components/MusicFilter/MusicFilter'

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
  const [music, setMusic] = useState(data)

  return (
    <>
      <h2 style={titleStyle}>Мои треки</h2>
      <MusicFilter setMusic={setMusic} musicList={data} isLoading={isLoading} />
      <Playlist
        tracks={music}
        isLoading={isLoading}
        error={error}
        showAllTracksAsLiked
      />
    </>
  )
}
