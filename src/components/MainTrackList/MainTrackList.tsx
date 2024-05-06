import { useState } from 'react'
import { MusicFilter } from '../MusicFilter/MusicFilter'
import { Playlist } from '../Playlist/Playlist'
import { useGetTracksQuery } from '../../services/servicesApi'

const titleStyle = {
	fontStyle: 'normal',
	fontWeight: ' 400',
	fontSize: '64px',
	lineHeight: ' 72px',
	letterSpacing: '-0.8px',
	marginBottom: '45px',
}

export const MainTrackList = () => {
	const { data, isLoading, error } = useGetTracksQuery()
	const [music, setMusic] = useState(data)
	return (
		<>
			<h2 style={titleStyle}>Треки</h2>
			<MusicFilter setMusic={setMusic} musicList={data} isLoading={isLoading} />
			<Playlist tracks={music} isLoading={isLoading} error={error}  />
		</>
	)
}
