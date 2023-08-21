export default function Playlist({ isLoading, playlistMusic }) {
  return (
    <div className="centerblock__content">
      <PlaylistTitle />
      <div className="content__playlist playlist">
        {playlistMusic.map((track) => (
          <PlaylistItem
            key={track.id}
            playlistMusic={playlistMusic}
            trackImgUrl={track.trackImgUrl}
            trackTitle={track.trackTitle}
            trackTitleSpan={track.trackTitleSpan}
            trackAuthor={track.trackAuthor}
            album={track.album}
            trackTime={track.trackTime}
            year={track.year}
            genre={track.genre}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  )
}

function PlaylistTitle() {
  return (
    <div className="content__title playlist-title">
      <div className="playlist-title__col col01">Трек</div>
      <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
      <div className="playlist-title__col col03">АЛЬБОМ</div>
      <div className="playlist-title__col col04">
        <svg className="playlist-title__svg" alt="time">
          <use xlinkHref="img/icon/sprite.svg#icon-watch" />
        </svg>
      </div>
    </div>
  )
}

function PlaylistItem({
  trackImgUrl,
  trackTitle,
  trackAuthor,
  album,
  trackTime,
  trackTitleSpan,
  isLoading,
}) {
  return (
    <div className="playlist__item">
      <div className="playlist__track track">
        <div className="track__title">
          <div className="track__title-image">
            <svg className="track__title-svg" alt="music">
              <use xlinkHref={trackImgUrl} />
            </svg>
            {isLoading && <div className="skeleton" />}
          </div>
          <div className="track__title-text">
            {isLoading && <div className="skeleton" />}
            <a className="track__title-link" href="http://">
              {trackTitle}
              <span className="track__title-span">{trackTitleSpan}</span>
            </a>
          </div>
        </div>
        <div className="track__author">
          <a className="track__author-link" href="http://">
            {trackAuthor}
          </a>
          {isLoading && <div className="skeleton" />}
        </div>
        <div className="track__album">
          <a className="track__album-link" href="http://">
            {album}
          </a>
          {isLoading && <div className="skeleton" />}
        </div>
        <div className="track__time">
          <svg className="track__time-svg" alt="time">
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className="track__time-text">{trackTime}</span>
          {isLoading && <div className="skeleton" />}
        </div>
      </div>
    </div>
  )
}
