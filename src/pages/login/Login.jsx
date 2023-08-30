import * as S from '../../App.styles'
// import * as Style from './Login.styles'

export default function Login() {
  return (
    <S.CenterBlock>
      <h1>Страница логина</h1>
      <button style={{ width: ' 100px', padding: '10px' }} type="button">
        Войти
      </button>
      <a href="/#">Перейти к регистрации</a>
    </S.CenterBlock>
  )
}
