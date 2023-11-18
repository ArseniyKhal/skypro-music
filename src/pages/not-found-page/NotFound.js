import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import * as S from '../../App.styles'

const ParagraphBlock = styled.div`
  display: flex;
  gap: 8px;
`
const ParagraphText = styled.p`
  font-size: 18px;
  line-height: 133%;
  color: #4e4e4e;
`
const ParagraphImg = styled.div`
  width: 52px;
  height: 52px;
  background-image: url('/img/smile_crying.png');
`

export const NotFound = () => {
  const navigate = useNavigate()
  const handleBackButtonClick = () => {
    navigate('/login', { replace: true })
  }

  return (
    <S.CenterBlock>
      <h1 style={{ fontSize: '160px', lineHeight: '105%' }}>404</h1>
      <ParagraphBlock>
        <h2
          style={{
            fontSize: '32px',
            lineHeight: '125%',
          }}
        >
          Страница не найдена
        </h2>
        <ParagraphImg />
      </ParagraphBlock>
      <ParagraphText>
        Возможно, она была удалена <br /> или перенесена на другой адрес
      </ParagraphText>
      <button onClick={handleBackButtonClick} style={S.BtnLogin} type="button">
        Вернуться на главную
      </button>
    </S.CenterBlock>
  )
}
