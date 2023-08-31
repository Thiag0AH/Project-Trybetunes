import { useEffect, useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import AlbumList from './AlbumList';

type NewAlbumType = AlbumType[] | undefined;

function Search() {
  const [artist, setArtist] = useState('');
  const [searchResult, setResult] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [album, setAlbum] = useState<NewAlbumType>();
  const [boolean, setBoolean] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(event.target.value);
  };
  const lengthCheck = () => (artist.length < 2);

  useEffect(() => {
    const checkArray = () => setBoolean(typeof (album) !== 'undefined');
    checkArray();
  }, [album]);

  const handleSearch = async () => {
    setCarregando(true);
    const searchApi = await searchAlbumsAPI(artist);
    setAlbum(searchApi);
    setCarregando(false);
    setResult(artist);
    setArtist('');
  };

  const handleAlbum = () => {
    if (typeof (album) !== 'undefined') {
      return album;
    }
    return [];
  };

  return (
    <>
      <label htmlFor="search">Busca</label>
      <input
        data-testid="search-artist-input"
        name="search"
        type="text"
        value={ artist }
        onChange={ handleChange }
      />
      <button
        data-testid="search-artist-button"
        disabled={ lengthCheck() }
        onClick={ handleSearch }
      >
        pesquisar
      </button>
      { carregando && <p>Carregando...</p> }
      {boolean
        ? <AlbumList artist={ searchResult } albumMap={ handleAlbum } />
        : <p>Nenhum álbum foi encontrado</p>}
    </>
  );
}

export default Search;
