import Search from './search'
import Playlist from './playlist'
import MusicFilter from './filter'

export default function Centerblock({ isLoading, playlistMusic }) {
  return (
    <div className="main__centerblock centerblock">
      <Search />
      <h2 className="centerblock__h2">Треки</h2>
      <MusicFilter />
      <Playlist isLoading={isLoading} playlistMusic={playlistMusic} />
    </div>
  )
}
