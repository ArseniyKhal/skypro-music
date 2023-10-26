import { styled } from 'styled-components'

export const MainNav = styled.nav`
  width: 244px;
  background-color: var(--color-bg);
  padding: 20px 0 20px 36px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (width <= 1900px) {
    width: auto;
    flex-direction: row;
    padding: 20px 36px 0px 36px;
    justify-content: space-between;
  }
`
export const NavLogo = styled.div`
  width: 113.33px;
  height: 43px;
  padding: 13px 0 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
`
export const LogoImage = styled.img`
  width: 113.33px;
  height: 17px;
`
export const NavBurger = styled.button`
  width: 20px;
  height: 37px;
  padding: 13px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  background-color: inherit;
  border: none;
  @media (width <= 1900px) {
    display: none;
  }
`
export const BurgerLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: var(--color-text);
`
export const NavMenu = styled.div`
  display: block;
  transition: all 0.2s ease;
  visibility: hidden;
  @media (width <= 1900px) {
    visibility: visible;
  }
`
export const MenuList = styled.ul`
  padding: 18px 0 10px 0;
  @media (width <= 1900px) {
    padding: 0;
    display: flex;
    gap: 20px;
  }
`
export const MenuBlock = styled.div`
  @media (width <= 1900px) {
    display: flex;
    gap: 20px;
  }
`
export const MenuItem = styled.li`
  margin-bottom: 26px;
  @media (width <= 1900px) {
    padding-top: 9px;
  }
`

export const MenuItemVisib = styled(MenuItem)`
  @media (width >= 1900px) {
    display: none;
  }
`
export const ModeSwitcher = styled.img`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  cursor: pointer;
`

export const MenuLink = {
  fontWeight: '400',
  fontXize: '16px',
  lineHeight: '24px',
}
