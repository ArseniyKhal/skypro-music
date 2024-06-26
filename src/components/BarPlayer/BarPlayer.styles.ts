import { styled } from 'styled-components'

export const BarContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: var(--color-bg);
`

export const BarPlayerTime = styled.div`
  display: flex;
  justify-content: end;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 2%;
`

export const BarPlayerProgress = styled.div`
  width: 100%;
  height: 5px;
  background: var(--color-progress-line);
  cursor: pointer;
  transition: height 0.1s;
  &:hover {
    height: 12px;
  }
`
export const BarPlayerProgressInside = styled.div`
  width: 0;
  height: 100%;
  background: #b672ff;
`
export const BarPlayerBlock = styled.div`
  height: 73px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`
export const BarPlayer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`
export const BarPlayerTrackPlay = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
`
export const BarVolumeBlock = styled.div`
  width: 139px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 36px;
`
export const Bar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`
export const PlayerControls = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 0 27px 0 31px;
`
export const PlayerBtn = styled.div`
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
`
export const PlayerBtnPrev = styled(PlayerBtn)`
  margin-right: 23px;
`
export const PlayerBtnPrevSvg = styled.svg`
  width: 15px;
  height: 14px;
`
export const PlayerBtnPlay = styled(PlayerBtn)`
  margin-right: 23px;
`
export const PlayerBtnPlaySvg = styled.svg`
  width: 22px;
  height: 20px;
  fill: #d9d9d9;
`
export const PlayerBtnNext = styled(PlayerBtn)`
  margin-right: 28px;
  fill: #a53939;
`
export const PlayerBtnNextSvg = styled.svg`
  width: 15px;
  height: 14px;
  fill: inherit;
  stroke: #d9d9d9;
`
export const PlayerBtnRepeat = styled(PlayerBtn)`
  margin-right: 24px;
`
export const PlayerBtnRepeatSvg = styled.svg`
  width: 18px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`
export const PlayerBtnShuffle = styled(PlayerBtn)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`
export const PlayerBtnShuffleSvg = styled.svg`
  width: 19px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`
export const TrackPlayContain = styled.div`
  width: auto;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'image author' 'image album';
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
`
export const TrackPlayImage = styled.div`
  width: 51px;
  height: 51px;
  background-color: var(--color-bg-wrap);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 12px;
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  -ms-grid-column: 1;
  grid-area: image;
  position: relative;
`
export const TrackPlaySvg = styled.svg`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`
export const TrackPlayAuthor = styled.div`
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  grid-area: author;
  min-width: 49px;
  position: relative;
  width: 100%;
`
export const TrackPlayAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const TrackPlayAlbum = styled.div`
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  grid-area: album;
  min-width: 49px;
  position: relative;
  width: 100%;
`
export const TrackPlayAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const TrackPlayLikesDis = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 26px;
`
export const TrackPlayLikes = styled.div`
  padding: 5px;
`
export const TrackPlayLikesSvg = styled.svg`
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`
export const TrackPlayDislikes = styled.div`
  padding: 5px;
  margin-left: 28.5px;
`
export const TrackPlayDislikesSvg = styled.svg`
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: #696969;
`
export const VolumeContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: end;
`
export const VolumeImage = styled.div`
  width: 22px;
  height: 20px;
  margin-right: 17px;
  cursor: pointer;
`
export const VolumeSvg = styled.svg`
  width: 100%;
  height: 100%;
  fill: transparent;
`
export const VolumeProgress = styled.div`
  display: flex;
  position: relative;
  width: 109px;
  height: 20px;
  overflow: hidden;
`
export const VolumeProgressLine = styled.input`
  width: 109px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: inherit;
  position: absolute;
  height: 5px;
  top: 8px;

  &::-webkit-slider-runnable-track {
    height: 3px;
    -webkit-appearance: none;
    background-color: var(--color-text-2);
    color: #13bba4;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: var(--color-bg);
    border: 3px solid var(--color-text);
    border-radius: 50%;
    cursor: pointer;
    width: 16px;
    height: 16px;
    position: relative;
    top: -6.5px;
  }
  &::-moz-range-progress {
    background-color: #ad61ff;
  }
  &::-moz-range-track {
    top: 8px;
    background-color: var(--color-text-2);
  }
  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background: var(--color-bg);
    border: 3px solid var(--color-text);
    border-radius: 50%;
    cursor: pointer;
  }
`
