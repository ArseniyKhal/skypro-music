import { useParams } from 'react-router-dom'

export const Category = () => {
  const params = useParams()
  return (
    <>
      <h2
        style={{
          fontStyle: 'normal',
          fontWeight: ' 400',
          fontSize: '64px',
          lineHeight: ' 72px',
          letterSpacing: '-0.8px',
          marginBottom: '45px',
        }}
      >
        Category Page {params.id}
      </h2>
      {/* <MusicFilter />
      <Playlist tracks={data} isLoading={isLoading} /> */}
    </>
  )
}
