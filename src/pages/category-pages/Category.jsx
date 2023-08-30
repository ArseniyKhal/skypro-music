import { useParams } from 'react-router-dom'
import * as S from '../../App.styles'

export default function Category() {
  const params = useParams()
  return (
    <S.CenterBlock>
      <h1>Category Page {params.id} </h1>
    </S.CenterBlock>
  )
}
