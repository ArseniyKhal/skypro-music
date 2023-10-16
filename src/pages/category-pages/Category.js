import { useParams } from 'react-router-dom'
import { Playlist } from '../../components/Playlist/Playlist'
import { useGetСollectionsQuery } from '../../services/servicesApi'

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
  return (
    <>
      <h2 style={titleStyle}>{data?.name}</h2>
      <Playlist tracks={data?.items} isLoading={isLoading} error={error} />
    </>
  )
}
