import { AlbumType } from '../types';

type MusicCardProps = {
  card: AlbumType
};

function TitleCard({ card }: MusicCardProps) {
  return (
    <div>
      <h1 data-testid="artist-name">{ card.artistName }</h1>
      <h2 data-testid="album-name">{ card.collectionName }</h2>
    </div>
  );
}

export default TitleCard;
