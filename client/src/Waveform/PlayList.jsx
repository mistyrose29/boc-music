import React from 'react';

const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {
  console.log(tracks);
  console.log(selectedTrack);

  if (selectedTrack) {
    return (
      <div className='playlist'>
        {tracks.map(track => (
          <div
            key={track.id}
            className={
              track.id === selectedTrack.id
                ? 'playlist-item-selected'
                : 'playlist-item'
            }
            onClick={() => setSelectedTrack(track)}>
            {track.id + 1 + '. '}
            {track.title}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default PlayList;
