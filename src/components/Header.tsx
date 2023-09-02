import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Header() {
  const [carregando, setCarregando] = useState(true);
  const [user, setUser] = useState<UserType>();
  const [userDysplay, setUserDysplay] = useState<string>();
  useEffect(() => {
    const userHandler = async () => {
      const username = await getUser();
      setUser(username);
    };
    const getName = () => {
      if (typeof (user) !== 'undefined') {
        setUserDysplay(user.name);
        return true;
      }
      return false;
    };
    userHandler();
    if (getName()) {
      setCarregando(false);
    }
  }, [user]);
  if (carregando) {
    return <h1>Carregando...</h1>;
  }
  return (
    <>
      <header data-testid="header-component" />
      <Link to="/search" data-testid="link-to-search">search</Link>
      <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
      <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      <p data-testid="header-user-name">{ userDysplay }</p>
    </>
  );
}

export default Header;
