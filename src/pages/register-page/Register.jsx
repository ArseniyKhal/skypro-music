import { Link } from 'react-router-dom'
import * as S from '../../App.styles'

export default function Register() {
  return (
    <S.CenterBlock>
      <h1>Страница регистрации</h1>
      <Link to="/login" style={S.BtnLogin}>
        Назад
      </Link>
    </S.CenterBlock>
  )
}
