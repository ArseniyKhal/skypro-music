import { useRef, useState, useEffect, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatTime } from '../Playlist/Playlist'
import {
	currentTrackSelector,
	isPlauingSelector,
	isShuffledSelector,
	playListSelector,
} from '../../store/selectors/audioplayerSelectors'
import {
	nextTrack,
	prevTrack,
	togglePause,
	toggleShuffle,
} from '../../store/actions/creators/audioplayerCreator'
import {
	useLikeTrackMutation,
	useDislikeTrackMutation,
	useGetIdTrackQuery,
} from '../../services/servicesApi'
import {
	idUserSelector,
	themeSelector,
} from '../../store/selectors/authSelectors'
import { TrackType } from '../../types'
import * as S from './BarPlayer.styles'

export const BarPlayer = () => {
	const audioElem = useRef<HTMLAudioElement>(null);
	const dispatch = useDispatch()
	const trackInPlayer: TrackType | null = useSelector(currentTrackSelector)
	const playing = useSelector(isPlauingSelector)
	const playlist = useSelector(playListSelector)
	const [volume, setvolume] = useState(0.5)
	const [likeTrack] = useLikeTrackMutation()
	const [dislikeTrack] = useDislikeTrackMutation()
	const [loop, setLoop] = useState(false)

	//   громкость
	const volumeChange = (newVolume: number) => {
		setvolume(newVolume)
		if (audioElem.current) audioElem.current.volume = newVolume
	}

	// обработчик кнопки ПАУЗА
	useEffect(() => {
		if (trackInPlayer && audioElem.current) {
			playing ? audioElem.current.play() : audioElem.current.pause()
		}
	}, [playing])

	// полоска прогресса трека
	const [duration, setDuration] = useState<{ length: number, progress: number }>({
		length: 0,
		progress: 0
	})
	const onPlaying = () => {
		if (audioElem.current) {
			const durationTime = audioElem.current.duration
			const currentTime = audioElem.current.currentTime
			setDuration({
				length: durationTime,
				progress: (currentTime / durationTime) * 100,
			})
			// переход на следующий трек, если этот закончился
			durationTime === currentTime && dispatch(nextTrack())
		}
	}

	// если трек воспроизводится 5 сек, то PrevTreck переключит на начало песни
	const togglePrevTreck = () => {
		if (audioElem.current) {audioElem.current.currentTime > 5 ? audioElem.current.currentTime = 0 : dispatch(prevTrack())}
	}

	// клик по прогрессу для перемотки трека
	const clickRef = useRef<HTMLDivElement>(null)
	const checkWidth = (e: MouseEvent<HTMLDivElement>) => {
		if (clickRef.current) {
			const width = clickRef.current.clientWidth
			const offset = e.nativeEvent.offsetX
			const divProgress = (offset / width) * 100
			if (audioElem.current) audioElem.current.currentTime = (divProgress / 100) * duration.length
		}
	}

	// сброс shuffle при изменении плейлиста
	useEffect(() => {
		// dispatch(toggleShuffle('reset'))
		dispatch(toggleShuffle(false))
	}, [playlist])

	// лайкер в плеере
	const idUser = useSelector(idUserSelector)
	const { data } = useGetIdTrackQuery(trackInPlayer?.id)
	const isLike = data?.stared_user.some(({ id }: { id: number }) => id === idUser)

	let curTime: string | number = 0
	let durTime: string | number = 0
	if (audioElem.current) {
		curTime = formatTime(audioElem.current.currentTime)
		durTime = isNaN(duration.length) ? curTime : formatTime(duration.length)
	}
	return (
		<>
			<audio
				autoPlay
				controls
				ref={audioElem}
				onTimeUpdate={onPlaying}
				style={{ display: 'none' }}
				src={trackInPlayer?.track_file}
				loop={loop}
			>
				<track kind="captions" />
			</audio>

			<S.Bar>
				<S.BarPlayerTime>
					{curTime} / {durTime}
				</S.BarPlayerTime>
				<S.BarContent>
					<S.BarPlayerProgress onClick={checkWidth} ref={clickRef}>
						<S.BarPlayerProgressInside
							style={{ width: `${duration.progress}%` }}
						/>
					</S.BarPlayerProgress>
					<S.BarPlayerBlock>
						<S.BarPlayer>
							<PlayerButtons
								togglePrevTreck={togglePrevTreck}
								loop={loop}
								toggleLoop={() => setLoop(!loop)}
							/>
							<S.BarPlayerTrackPlay>
								<S.TrackPlayContain>
									<S.TrackPlayImage>
										<S.TrackPlaySvg >
											<use xlinkHref={trackInPlayer?.logo ?? '/img/icon/sprite.svg#icon-note'} />
										</S.TrackPlaySvg>
									</S.TrackPlayImage>
									<S.TrackPlayAuthor>
										<S.TrackPlayAuthorLink href="http://">
											{trackInPlayer?.author}
										</S.TrackPlayAuthorLink>
									</S.TrackPlayAuthor>
									<S.TrackPlayAlbum>
										<S.TrackPlayAlbumLink href="http://">{trackInPlayer?.name}</S.TrackPlayAlbumLink>
									</S.TrackPlayAlbum>
								</S.TrackPlayContain>
								<S.TrackPlayLikesDis>
									<S.TrackPlayLikes className=" _btn-icon">
										<S.TrackPlayLikesSvg
											onClick={() => isLike ? dislikeTrack(trackInPlayer?.id) : likeTrack(trackInPlayer?.id)}
											className="track-play__like-svg"
											style={{
												stroke: `${isLike ? '#B672FF' : ''}`,
												fill: `${isLike ? '#B672FF' : ''}`,
											}}
										>
											<use xlinkHref="/img/icon/sprite.svg#icon-like" />
										</S.TrackPlayLikesSvg>
									</S.TrackPlayLikes>
								</S.TrackPlayLikesDis>
							</S.BarPlayerTrackPlay>
						</S.BarPlayer>
						<S.BarVolumeBlock>
							<VolumeSlider volume={volume} volumeChange={volumeChange} />
						</S.BarVolumeBlock>
					</S.BarPlayerBlock>
				</S.BarContent>
			</S.Bar>
		</>
	)
}

// кнопки плеера
const PlayerButtons = ({ togglePrevTreck, loop, toggleLoop }:
	{ togglePrevTreck: () => void; loop: boolean; toggleLoop: () => void }) => {
	const playing = useSelector(isPlauingSelector)
	const shuffled = useSelector(isShuffledSelector)
	const dispatch = useDispatch()

	return (
		<S.PlayerControls>
			<S.PlayerBtnPrev onClick={togglePrevTreck}>
				<S.PlayerBtnPrevSvg >
					<use xlinkHref="/img/icon/sprite.svg#icon-prev" />
				</S.PlayerBtnPrevSvg>
			</S.PlayerBtnPrev>
			<S.PlayerBtnPlay onClick={() => dispatch(togglePause())}>
				<S.PlayerBtnPlaySvg >
					<use xlinkHref={`/img/icon/sprite.svg#icon-${playing ? 'pause' : 'play'}`} />
				</S.PlayerBtnPlaySvg>
			</S.PlayerBtnPlay>
			<S.PlayerBtnNext onClick={() => dispatch(nextTrack())}>
				<S.PlayerBtnNextSvg >
					<use xlinkHref="/img/icon/sprite.svg#icon-next" />
				</S.PlayerBtnNextSvg>
			</S.PlayerBtnNext>
			<S.PlayerBtnRepeat onClick={toggleLoop} className=" _btn-icon">
				<S.PlayerBtnRepeatSvg
					style={{ stroke: `${loop ? '#ACACAC' : '#696969'}` }}
				>
					<use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
				</S.PlayerBtnRepeatSvg>
			</S.PlayerBtnRepeat>
			<S.PlayerBtnShuffle
				onClick={() => dispatch(toggleShuffle())}
				className=" _btn-icon"
			>
				<S.PlayerBtnShuffleSvg
					style={{ stroke: `${shuffled ? '#ACACAC' : '#696969'}` }}
				>
					<use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
				</S.PlayerBtnShuffleSvg>
			</S.PlayerBtnShuffle>
		</S.PlayerControls>
	)
}

// громкость
const VolumeSlider = ({ volume, volumeChange }: { volume: number; volumeChange: (volume: number) => void }) => {
	const [tempVolume, setTempVolume] = useState(0)
	const toggleVolume = () => {
		volume && setTempVolume(volume)
		volumeChange(volume ? 0 : tempVolume)
	}
	const theme = useSelector(themeSelector)
	return (
		<S.VolumeContent>
			<S.VolumeImage onClick={toggleVolume}>
				<S.VolumeSvg >
					<use
						xlinkHref={`/img/icon/sprite.svg#icon-volume${theme === 'dark' ? '' : '_black'
							}${+volume ? '' : '_non'}`}
					/>
				</S.VolumeSvg>
			</S.VolumeImage>
			<S.VolumeProgress className=" _btn">
				<S.VolumeProgressLine
					className=" _btn"
					type="range"
					name="range"
					min={0}
					max={1}
					step={0.01}
					value={volume}
					onChange={(e) => {
						volumeChange(+e.target.value)
					}}
				/>
			</S.VolumeProgress>
		</S.VolumeContent>
	)
}
