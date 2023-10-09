import { useParams } from 'react-router-dom'
import { Centerblock } from '../../components/Centerblock/Centerblock'

export const Category = () => {
  const params = useParams()
  return <Centerblock tetle={`Category Page ${params.id}`} />
}
