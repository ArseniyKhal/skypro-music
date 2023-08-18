import './App.css'
import { useEffect, useState } from 'react'
import Nav from './components/nav'
import Sidebar from './components/sidebar'
import Centerblock from './components/centerblock'
import Bar from './components/bar'

const playlistMusic = [
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
export default function App() {
  // Загрузка 5 сек
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Nav />
          <Centerblock isLoading={isLoading} playlistMusic={playlistMusic} />
          <Sidebar isLoading={isLoading} />
        </main>
        <Bar isLoading={isLoading} />
        <footer className="footer" />
      </div>
    </div>
  )
}
