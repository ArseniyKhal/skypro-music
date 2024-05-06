import { useSelector, useDispatch } from 'react-redux'
import { MouseEvent, useContext } from 'react'
import {
    setCurrentTrack, addPlaylist
} from '../../store/actions/creators/audioplayerCreator'
import {
    useLikeTrackMutation,
    useDislikeTrackMutation
} from '../../services/servicesApi'
import { idUserSelector } from '../../store/selectors/authSelectors'
import { isPlauingSelector } from '../../store/selectors/audioplayerSelectors'
import { SearchContext } from '../Centerblock/Centerblock'
import { TrackType, TrackComponentType, RootState } from '../../types'
import * as S from './Playlist.styles'


// форматер времени трека
export const formatTime = (t: number) => {
    const time = Math.round(t)
    const hour: number = Math.floor(time / 3600)
    const min: number = Math.floor((time - hour * 3600) / 60)
    const sec: number = time - hour * 3600 - min * 60
    return `${hour === 0 ? '' : hour}${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
}

export const Playlist = ({
    tracks,
    isLoading,
    error,
}: {
    tracks: TrackType[]
    isLoading: boolean
    error: Error
}) => {

    // поиск
    let playlist: TrackType[] = tracks
    const searchText: string | null = useContext(SearchContext)
    if (searchText.length) {
        playlist = tracks.filter((el: TrackType) =>
            el.name.toLowerCase().includes(String(searchText).toLowerCase()),
        )
    }

    let mapTracks = null
    if (playlist?.length === 0) {
        mapTracks = <h2>Ничего не найдено *_*</h2>
    } else {
        mapTracks =
            tracks?.length > 0 ? (
                playlist.map((track: TrackType) => (
                    <Track
                        key={track.id}
                        track={track}
                        playlist={tracks}
                    />
                ))
            ) : (
                <h2>В этом плейлисте нет треков</h2>
            )
    }
    return (
        <S.CenterblockContent>
            <S.ContentTitle>
                <S.PlaylistTitleCol1>ТРЕК</S.PlaylistTitleCol1>
                <S.PlaylistTitleCol2>ИСПОЛНИТЕЛЬ</S.PlaylistTitleCol2>
                <S.PlaylistTitleCol3>АЛЬБОМ</S.PlaylistTitleCol3>
                <S.PlaylistTitleCol4>
                    <S.PlaylistTitleSvg >
                        <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
                    </S.PlaylistTitleSvg>
                </S.PlaylistTitleCol4>
            </S.ContentTitle>
            {error && 
                <p>Не удалось загрузить плейлист, попробуйте позже. Ошибка: {error.message}</p>
            }
            <S.ContentPlaylist>
                {isLoading
                    ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                        <Skeletons key={item} />
                    ))
                    : mapTracks}
            </S.ContentPlaylist>
        </S.CenterblockContent>
    )
}

const Track = ({ track, playlist }: TrackComponentType) => {
    const idUser = useSelector(idUserSelector)
    const playing = useSelector(isPlauingSelector)
    const dispatch = useDispatch()
    // фиолетовый круг на обложке при восроизведении
    const trackInPleer = useSelector((state:RootState) => state.audioplayer.track)
    let visibolbubbleOut = false
    if (trackInPleer) {
        if (trackInPleer.id === track?.id) {
            visibolbubbleOut = true
        }
    }

    // обработчик лайков
    const trackId = track?.id
    const [likeTrack] = useLikeTrackMutation()
    const [dislikeTrack, { error: dislikeError }] = useDislikeTrackMutation()
    let isLike: boolean | undefined = false
    if (dislikeError) {
        console.log(dislikeError.originalStatus)
    }
    isLike = !!(track.stared_user ?? []).find(({ id }) => id === idUser)

    if (window.location.pathname.includes("favorites")) {
        isLike = true
    }

    const toggleLike = (e: MouseEvent) => {
        e.stopPropagation()
        if (isLike) {
            dislikeTrack(trackId)
            isLike = false
        } else {
            likeTrack(trackId)
                .unwrap()
                .catch((error: string) => console.log(error))
            isLike = true
        }
    }
    // клик по треку
    const toggleTrackClick = () => {
        dispatch(setCurrentTrack(track))
        dispatch(addPlaylist(playlist))
    }

    return (
        <S.Track onClick={toggleTrackClick}>
            <S.PlaylistTrack>
                <S.TrackTitle>
                    <S.TrackTitleImage>
                        <S.TrackTitleSvg >
                            <use xlinkHref={track?.logo ?? '/img/icon/sprite.svg#icon-note'} />
                        </S.TrackTitleSvg>
                        {visibolbubbleOut && (
                            <S.bubbleOut style={{ animationDuration: `${playing ? '0.8s' : '0s'}` }} />
                        )}
                    </S.TrackTitleImage>
                    <S.TrackTitleText>
                        <S.TrackTitleLink >{track.name}</S.TrackTitleLink>
                    </S.TrackTitleText>
                </S.TrackTitle>
                <S.TrackAuthor>
                    <S.TrackAuthorLink >{track.author}</S.TrackAuthorLink>
                </S.TrackAuthor>
                <S.TrackAlbum>
                    <S.TrackAlbumLink >{track.album}</S.TrackAlbumLink>
                </S.TrackAlbum>
                <S.TrackTime>
                    <S.TrackTimeSvg onClick={(e) => toggleLike(e)}
                        style={{
                            stroke: `${isLike ? '#B672FF' : ''}`,
                            fill: `${isLike ? '#B672FF' : ''}`,
                        }}
                    >
                        <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                    </S.TrackTimeSvg>
                    <S.TrackTimeText>
                        {formatTime(track?.duration_in_seconds)}
                    </S.TrackTimeText>
                </S.TrackTime>
            </S.PlaylistTrack>
        </S.Track>
    )
}


const Skeletons = () => {
    return (
        <S.Track >
            <S.PlaylistTrack>
                <S.TrackTitle>
                    <S.TrackTitleImage>
                        <S.Skeleton />
                    </S.TrackTitleImage>
                    <S.TrackTitleText>
                        <S.TrackTitleLink >Loading...</S.TrackTitleLink>
                        <S.Skeleton />
                    </S.TrackTitleText>
                </S.TrackTitle>
                <S.TrackAuthor>
                    <S.TrackAuthorLink >
                        <S.TrackTitleLink >Loading...</S.TrackTitleLink>
                    </S.TrackAuthorLink>
                    <S.Skeleton />
                </S.TrackAuthor>
                <S.TrackAlbum>
                    <S.TrackAlbumLink >
                        <S.TrackTitleLink >Loading...</S.TrackTitleLink>
                        <S.Skeleton />
                    </S.TrackAlbumLink>
                </S.TrackAlbum>
                <S.TrackTime>
                    <S.TrackTimeSvg>
                        <use xlinkHref="/img/icon/sprite.svg#icon-like" />
                    </S.TrackTimeSvg>
                    <S.TrackTimeText>
                        <S.Skeleton />
                    </S.TrackTimeText>
                </S.TrackTime>
            </S.PlaylistTrack>
        </S.Track>
    )
}