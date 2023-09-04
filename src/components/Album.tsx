import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

type SongTypePlus = {
  isFavorite: boolean,
  songType: SongType };
function Album() {
  const params = useParams();
  const [carregando, setCarregando] = useState(true);
  const [title, setTitle] = useState<AlbumType>();
  const [song, setSongs] = useState<SongType[]>([]);
  const [name, setName] = useState<string>();
  const [albumName, setAlbumName] = useState<string>();
  const [songisFavorite, setSongFavorite] = useState<SongTypePlus[]>([]);
  useEffect(() => {
    const getSongs = async () => {
      if (typeof (params.id) !== 'undefined') {
        const albumSongs = await getMusics(params.id);
        const [albumType, ...songType] = albumSongs;
        setTitle(albumType);
        setSongs(songType);
      }
    };
    const favorites = async () => {
      const favorite = await getFavoriteSongs();
      const songList = song;
      const prevSong: SongTypePlus[] = [];
      songList.map((elemnt) => {
        const favElement = favorite.find((favs) => elemnt.trackId === favs.trackId);
        if (typeof (favElement) !== 'undefined') {
          return prevSong.push({ isFavorite: true, songType: favElement });
        }
        return prevSong.push({ isFavorite: false, songType: elemnt });
      });
      setSongFavorite(prevSong);
    };
    favorites();
    getSongs();
  }, [params, song, songisFavorite]);
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
    const getFavoriteCheck = () => {
      if (songisFavorite.length === song.length) {
        return true;
      }
    };
    const handleLoading = async () => {
      if (getName() && getAlbumName() && getFavoriteCheck()) {
        setCarregando(false);
      }
    };
    getFavoriteCheck();
    getName();
    getAlbumName();
    handleLoading();
  }, [song.length, songisFavorite.length, title]);

  if (carregando) {
    return <h1>Carregando...</h1>;
  }
  return (
    <>
      <div>
        <h1 data-testid="artist-name">{ name }</h1>
        <h2 data-testid="album-name">{ albumName }</h2>
      </div>
      {songisFavorite.map((element) => {
        return (
          <MusicCard
            key={ element.songType.trackId }
            card={ element }
          />
        );
      })}
    </>
  );
}

export default Album;
