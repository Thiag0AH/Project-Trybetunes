import { useEffect, useState } from 'react';
import { SongType } from '../types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

type SongTypePlus = {
  isFavorite: boolean,
  songType: SongType };

type MusicCardProps = {
  card: SongTypePlus
};

function MusicCard({ card }: MusicCardProps) {
  const fullHeart = 'checked_heart.png';
  const emptyHeart = 'empty_heart.png';
  const { isFavorite, songType } = card;
  useEffect(() => {});
  const handleFavorite = async () => {
    if (card.isFavorite) {
      await removeSong(songType);
    } else {
      await addSong(songType);
    }
  };

  return (
    <>
      <p>{songType.trackName}</p>
      <audio data-testid="audio-component" src={ songType.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `favorite-id${songType.trackId}` }
        data-testid={ `checkbox-music-${songType.trackId}` }
      >
        <img
          src={ isFavorite
            ? `/src/images/${fullHeart}` : `/src/images/${emptyHeart}` }
          alt="favorite"
        />

        <input
          type="checkbox"
          name="favorite"
          checked={ isFavorite }
          id={ `favorite-id${songType.trackId}` }
          onChange={ handleFavorite }
        />
      </label>
    </>
  );
}

export default MusicCard;
