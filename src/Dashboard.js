import React from 'react';
import useAuth from './useAuth'
import {Container, Form} from 'react-bootstrap'
import axios from 'axios'
import SearchResultContainer from './searchresultcontainer'
import Player from './Player'


const Dashboard = ({code}) => {
    let accessT = useAuth(code)
    const [accessToken, setAccessToken] = React.useState(accessT)
    const [search, setSearch] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([])
    const [playingTrack, setPlayingTrack] = React.useState()
    console.log(searchResults)

    function chooseTrack(track){
      setPlayingTrack(track)
      setSearch('')
    }

    React.useEffect(() => {
      if(!accessToken){
         setAccessToken(accessT)
         console.log(accessT)
      }
    }, [accessToken, accessT])

    React.useEffect(() => {
      if(!search) return setSearchResults([])
      let cancel = false 
      var authField = ('Bearer ' + accessToken)
      console.log(authField)
      axios.get(('https://api.spotify.com/v1/search?type=track,artist,album&q='+search),
      {
        headers: {
          'Authorization': authField,
          'content-type': 'application/x-www-form-urlencoded',
        }
      }
      ).then((response) => {
        if(cancel) return
        //console.log(response)
        setSearchResults(response.data.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce((smallest,image) => {
            if(image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])

          return{
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url
          }
        }))
      }).catch(error => console.log(error))
      return () => cancel = true
    }, [search, accessToken])

  return <Container className="d-flex justify-content-center flex-column bg-dark py-2" style={{minHeight: "100vh", minWidth: "100vw", backgroundColor: "--bs-gray-dark", color: "white"}}>
     <Form.Control type="search" placeholder="Search songe/Artists" value={search} onChange={e => setSearch(e.target.value)} />
    <div className="flex-grow-1 my-2" style={{overflowY: 'auto'}}>
      {console.log(searchResults)}
      {searchResults.map(track => (<SearchResultContainer track={track} key={track.uri} chooseTrack={chooseTrack}/>))}
      {searchResults.length === 0 && (
        <div className="text-center" style={{whiteSpace: 'pre'}} >
          {/*Lyrics/Alternate Styling */}
        </div>
      )}
    </div>
    <div>
      {console.log(playingTrack)}
      <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
    </div>


    </Container>
};

export default Dashboard;