export default function Playlist({ isLoading }) {
  return (
    <>
      <PlaylistTitle />
      <div className="content__playlist playlist">
        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="Guilt"
          trackTitleSpan=""
          trackAuthor="Nero"
          album="Welcome Reality"
          trackTime="4:44"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="Elektro"
          trackTitleSpan=""
          trackAuthor="Dynoro, Outwork, Mr. Gee"
          album="Elektro"
          trackTime="2:22"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="I’m Fire"
          trackTitleSpan=""
          trackAuthor="Ali Bakgor"
          album="I’m Fire"
          trackTime="2:22"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="Non Stop"
          trackTitleSpan="(Remix)"
          trackAuthor="Стоункат, Psychopath"
          album="Non Stop"
          trackTime="4:12"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="Run Run"
          trackTitleSpan="(feat. AR/CO)"
          trackAuthor="Jaded, Will Clarke, AR/CO"
          album="Run Run"
          trackTime="2:54"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="Eyes on Fire"
          trackTitleSpan="(Zeds Dead Remix)"
          trackAuthor="Blue Foundation, Zeds Dead"
          album="Eyes on Fire"
          trackTime="5:20"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="Mucho Bien"
          trackTitleSpan="(Hi Profile Remix)"
          trackAuthor="HYBIT, Mr. Black, Offer Nissim, Hi Profile"
          album="Mucho Bien"
          trackTime="3:41"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="Knives n Cherries"
          trackTitleSpan=""
          trackAuthor="minthaze"
          album="Captivating"
          trackTime="1:48"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="How Deep Is Your Love"
          trackTitleSpan=""
          trackAuthor="Calvin Harris, Disciples"
          album="How Deep Is Your Love"
          trackTime="3:32"
          isLoading={isLoading}
        />

        <PlaylistItem
          trackImgUrl="img/icon/sprite.svg#icon-note"
          trackTitle="Morena"
          trackTitleSpan=""
          trackAuthor="Tom Boxer"
          album="Soundz Made in Romania"
          trackTime="3:36"
          isLoading={isLoading}
        />
      </div>
    </>
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
