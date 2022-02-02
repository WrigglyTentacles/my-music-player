import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

function Player({accessToken, trackUri}) {
    const [play, setPlay] = React.useState(false)

    React.useEffect(() => setPlay(true), [trackUri])

    console.log(trackUri)
    if(!accessToken) return(null)
  return (<SpotifyPlayer 
  token={accessToken}
  showSaveIcon
  callback={state => {
      if(!state.isPlaying) setPlay(false)
  }}
  play={play}
  uris={trackUri ? [trackUri] : []}
  />);
  
}

export default Player;
