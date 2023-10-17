import { styled } from 'styled-components'

export const CenterblockFilter = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  margin-bottom: 51px;
  justify-content: space-between;
`
export const FilterSearc = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const FilterSort = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const FilterTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
`
export const FilterItem = styled.div`
  position: relative;
  &:not(:last-child) {
    margin-right: 10px;
  }
`
export const FilterText = styled.li`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    color: #b672ff;
    text-decoration-line: underline;
  }
`
export const FilterList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 28px;
  color: #fff;
  font-variant-numeric: lining-nums proportional-nums;
  font-size: 20px;
  line-height: 120%;
`
export const FilterContent = styled.div`
  overflow: auto;
  max-height: 237px;
  width: 220px;
`
export const FilterMenu = styled.div`
  position: absolute;
  padding: 34px 18px 34px 34px;
  border-radius: 12px;
  background: #313131;
  z-index: 2;
  top: 49px;
  left: 0;
`
export const FilterButton = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
`

export const FilterLabel = styled.div`
  color: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  border-radius: 30px;
  background-color: #ad61ff;
  position: absolute;
  top: -8px;
  right: -9px;
  padding: 6px 9px;
`
