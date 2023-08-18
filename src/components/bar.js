import {
  PlayerButtons,
  VolumeSlider,
  Likes,
  TrackPlay,
} from './player-controls'

export default function Bar({ isLoading }) {
  return (
    <div className="bar">
      <div className="bar__content">
        <div className="bar__player-progress" />
        <div className="bar__player-block">
          <div className="bar__player player">
            <PlayerButtons />
            <div className="player__track-play track-play">
              <TrackPlay isLoading={isLoading} />
              <Likes />
            </div>
          </div>
          <div className="bar__volume-block volume">
            <VolumeSlider />
          </div>
        </div>
      </div>
    </div>
  )
}
