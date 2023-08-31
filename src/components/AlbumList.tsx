import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

type AlbumListProps = {
  artist: string,
  albumMap: () => AlbumType[]
};

function AlbumList({ artist, albumMap }: AlbumListProps) {
  const album = albumMap();
  return (
    <>
      <h2>
        Resultado de álbuns de:
        {' '}
        { artist }
      </h2>
      { album.map((element) => {
        return (
          <Link
            data-testid={ `link-to-album-${element.collectionId}` }
            key={ element.collectionId }
            to={ `/album/${element.collectionId}` }
          >
            { element.collectionName }
          </Link>
        );
      }) }
    </>

  );
}

export default AlbumList;
