import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';

function Album() {
  const params = useParams();
  const [carregando, setCarregando] = useState(true);
  const [title, setTitle] = useState<AlbumType>();
  const [song, setSongs] = useState<SongType[]>([]);
  const [name, setName] = useState<string>();
  const [albumName, setAlbumName] = useState<string>();
  useEffect(() => {
    const getSongs = async () => {
      if (typeof (params.id) !== 'undefined') {
        const albumSongs = await getMusics(params.id);
        const [albumType, ...songType] = albumSongs;
        setTitle(albumType);
        setSongs(songType);
      }
    };
    getSongs();
  }, [params]);
  useEffect(() => {
    const getName = () => {
      if (typeof (title) !== 'undefined') {
        setName(title.artistName);
        return true;
      }
      return false;
    };
    const getAlbumName = () => {
      if (typeof (title) !== 'undefined') {
        setAlbumName(title.collectionName);
        return true;
      }
      return false;
    };
    getName();
    getAlbumName();
    if (getName() && getAlbumName()) {
      setCarregando(false);
    }
  }, [title]);
  if (carregando) {
    return <h1>Carregando...</h1>;
  }
  return (
    <>
      <div>
        <h1 data-testid="artist-name">{ name }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
      </div>
      {song.map((element) => {
        return (
          <MusicCard key={ element.trackId } card={ element } />
        );
      })}
    </>
  );
}

export default Album;
