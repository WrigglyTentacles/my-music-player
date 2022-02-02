import React from 'react';

const SearchResultContainer = ({ track, chooseTrack }) => {
    function handlePlay(){
        chooseTrack(track)
    }
  return (
  <div className="d-flex m-2 align-items-center" style={{cursor: 'pointer'}} onClick={(handlePlay)}>
      <img alt="album" src={track.albumUrl} style={{height:"64px", width: "64px"}} />
      <div className="ml-3" style={{padding: '.4em'}}>
          <div>{track.title}</div>
          <div className="text-muted">{track.artist}</div>
      </div>

  </div>)
};

export default SearchResultContainer;
