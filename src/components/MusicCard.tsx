import { SongType } from '../types';

type MusicCardProps = {
  card: SongType
};

function MusicCard({ card }: MusicCardProps) {
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
    </>
  );
}

export default MusicCard;
