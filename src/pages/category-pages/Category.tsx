import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Playlist } from '../../components/Playlist/Playlist'
import { useGetСollectionsQuery } from '../../services/servicesApi'
import { MusicFilter } from '../../components/MusicFilter/MusicFilter'

const titleStyle = {
  fontStyle: 'normal',
  fontWeight: ' 400',
  fontSize: '64px',
  lineHeight: ' 72px',
  letterSpacing: '-0.8px',
  marginBottom: '45px',
}

export const Category = () => {
  const params = useParams()
  const { id } = params
  const { data, isLoading, error } = useGetСollectionsQuery(id)
  const [music, setMusic] = useState(data?.items)
  return (
    <>
      <h2 style={titleStyle}>{data?.name}</h2>
      <MusicFilter
        setMusic={setMusic}
        musicList={data?.items}
        isLoading={isLoading}
      />
      <Playlist tracks={music} isLoading={isLoading} error={error} />
    </>
  )
}
