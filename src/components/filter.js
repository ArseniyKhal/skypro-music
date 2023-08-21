import { useState } from 'react'

export const playlistMusic = [
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Guilt',
    trackTitleSpan: '',
    trackAuthor: 'Nero',
    album: 'Welcome Reality',
    trackTime: '4:44',
    year: '1980',
    genre: 'rock',
    id: 'fghtfgkhmjrtlkhnfgb',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Elektro',
    trackTitleSpan: '',
    trackAuthor: 'Dynoro, Outwork, Mr. Gee',
    album: 'Elektro',
    trackTime: '2:22',
    year: '2020',
    genre: 'rock',
    id: '45645fdgklerjt54j',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'I’m Fire',
    trackTitleSpan: '',
    trackAuthor: 'Ali Bakgor',
    album: 'I’m Fire',
    trackTime: '2:22',
    year: '2001',
    genre: 'rock',
    id: '567ynfght7un7tuj',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Non Stop',
    trackTitleSpan: '(Remix)',
    trackAuthor: 'Стоункат, Psychopath',
    album: 'Non Stop',
    trackTime: '4:12',
    year: '2001',
    genre: 'rock',
    id: 'e5t7e57nrthbfuytu',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Run Run',
    trackTitleSpan: '(feat. AR/CO)',
    trackAuthor: 'Jaded, Will Clarke, AR/CO',
    album: 'Run Run',
    trackTime: '2:54',
    year: '1980',
    genre: 'electronic',
    id: 'tyu67nrtbyrdyr6yb',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Eyes on Fire',
    trackTitleSpan: '(Zeds Dead Remix)',
    trackAuthor: 'Blue Foundation, Zeds Dead',
    album: 'Eyes on Fire',
    trackTime: '5:20',
    year: '2009',
    genre: 'hip-hop',
    id: 'nrty65756rtbdyrby656by',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Mucho Bien',
    trackTitleSpan: '(Hi Profile Remix)',
    trackAuthor: 'HYBIT, Mr. Black, Offer Nissim, Hi Profile',
    album: 'Mucho Bien',
    trackTime: '3:41',
    year: '2007',
    genre: 'rock',
    id: 'brst5r645br5yrdtngku',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Knives n Cherries',
    trackTitleSpan: '',
    trackAuthor: 'minthaze',
    album: 'Captivating',
    trackTime: '1:48',
    year: '2009',
    genre: 'pop',
    id: 'fsrtyrby65nyntunth',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'How Deep Is Your Love',
    trackTitleSpan: '',
    trackAuthor: 'Calvin Harris, Disciples',
    album: 'How Deep Is Your Love',
    trackTime: '3:32',
    year: '2012',
    genre: 'electronic',
    id: 'dfnfynut7mudtunt6d6by6yj',
  },
  {
    trackImgUrl: 'img/icon/sprite.svg#icon-note',
    trackTitle: 'Morena',
    trackTitleSpan: '',
    trackAuthor: 'Tom Boxer',
    album: 'Soundz Made in Romania',
    trackTime: '3:36',
    year: '1999',
    genre: 'pop',
    id: 'rtbhr6e765ntdrtbnfyuny',
  },
]

export default function MusicFilter() {
  const [visibleFilter, setvisibleFilter] = useState(null)
  const toggleVisibleFilter = (filter) => {
    setvisibleFilter(visibleFilter === filter ? null : filter)
  }
  return (
    <div className="centerblock__filter filter">
      <div className="filter__title">Искать по:</div>
      <MusicFilterItem
        title="исполнителю"
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
      />
      <MusicFilterItem
        title="году выпуска"
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
      />
      <MusicFilterItem
        title="жанру"
        visibleFilter={visibleFilter}
        toggleVisibleFilter={toggleVisibleFilter}
      />
    </div>
  )
}

function MusicFilterItem({ toggleVisibleFilter, title, visibleFilter }) {
  return (
    <div
      className="filter__item"
      onClick={() => toggleVisibleFilter(title)}
      aria-hidden="true"
    >
      <div className="filter__button button-author _btn-text">{title}</div>
      {visibleFilter === title && (
        <div className="filter__menu">
          <div className="filter__content">
            <ul className="filter__list">
              {/* <FilterListText text="Michael Jackson" />
              <FilterListText text="Frank Sinatra" /> */}
              {playlistMusic.map((track) => (
                <li className="filter__text" key={track.id}>
                  {/* {title === 'исполнителю'
                    ? track.trackAuthor
                    : title === 'году выпуска'
                    ? track.year
                    : track.genre} */}
                  {/* Вложенные тернарные выражения запрещены. Не пойму как тут сделать двойное условие */}
                  {title === 'исполнителю' ? track.trackAuthor : track.year}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
// function FilterListText({ text }) {
//   return <li className="filter__text">{text}</li>
// }
