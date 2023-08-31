import { useNavigate } from 'react-router-dom'
import * as S from '../../App.styles'

export default function Register() {
  const navigate = useNavigate()
  const handleBackButtonClick = () => {
    navigate('/', { replace: true })
  }
  return (
    <S.CenterBlock>
      <h1>Страница регистрации</h1>
      <button onClick={handleBackButtonClick} style={S.BtnLogin} type="button">
        Назад
      </button>
    </S.CenterBlock>
  )
}
