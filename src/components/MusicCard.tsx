import { useState } from 'react';
import { SongType } from '../types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

type MusicCardProps = {
  card: SongType
};
type Heart = 'empty_heart.png' | 'checked_heart.png';

function MusicCard({ card }: MusicCardProps) {
  const fullHeart = 'checked_heart.png';
  const emptyHeart = 'empty_heart.png';
  const [heartPng, setHeartPng] = useState<Heart>(emptyHeart);
  const handleFavorite = async () => {
    if (heartPng === emptyHeart) {
      setHeartPng(fullHeart);
      await addSong(card);
    } else {
      setHeartPng(emptyHeart);
      await removeSong(card);
    }
  };
  return (
    <>
      <p>{card.trackName}</p>
      <audio data-testid="audio-component" src={ card.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `favorite-id${card.trackId}` }
        data-testid={ `checkbox-music-${card.trackId}` }
      >
        <img src={ `/src/images/${heartPng}` } alt="favorite" />

        <input
          type="checkbox"
          name="favorite"
          id={ `favorite-id${card.trackId}` }
          onChange={ handleFavorite }
        />
      </label>
    </>
  );
}

export default MusicCard;
