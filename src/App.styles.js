import { styled, createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@font-face {
	font-family: "StratosSkyeng";
	src: local("StratosSkyeng"), local("StratosSkyeng"),
		url("/fonts/StratosSkyeng.woff2") format("woff2"),
		url("/fonts/StratosSkyeng.woff") format("woff");
	font-weight: 400;
	font-style: normal;
}
* {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	}
*:before,
*:after {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
a,
a:visited {
	text-decoration: none;
	font-family: "StratosSkyeng", sans-serif;
	cursor: pointer;
	color: inherit;
}
ul li {
	list-style: none;
}
button,
._btn {
	cursor: pointer;
}
html, body {
	width: 100%;
	height: 100%;
	font-family: "StratosSkyeng", sans-serif;
	color: #ffffff;
	scrollbar-color: #FFFFFF #4B4949;
	scrollbar-width: thin;
}
._btn-text:hover {
	border-color: #d9b6ff;
	color: #d9b6ff;
	cursor: pointer;
}
._btn-icon:hover svg {
	fill: transparent;
	stroke: #acacac;
	cursor: pointer;
}

._btn-text:active {
	border-color: #ad61ff;
	color: #ad61ff;
	cursor: pointer;
}

._btn-icon:active svg {
	fill: transparent;
	stroke: #ffffff;
	cursor: pointer;
}
._btn-icon:active .track-play__like-svg,
._btn-icon:active .track-play__dislike-svg {
	fill: #696969;
	stroke: #ffffff;
	cursor: pointer;
}
.skeleton {
	background-color: #313131;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
`

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
`
export const Container = styled.div`
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
  display: flex;
  justify-content: center;
`
export const Main = styled.main`
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`
export const CenterBlock = styled.div`
  position: relative;
  top: 30vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`
