import { useEffect, useState } from 'react';
import { createUser } from '../services/userAPI';

function Login() {
  const [user, setUser] = useState({ name: '' });
  const [carregando, setCarregando] = useState(false);
  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ name: event.target.value });
  };
  const lengthCheck = () => {
    return (user.name.length < 3);
  };

  const handleConfirm = async () => {
    setCarregando(true);
    await fetchuser();
    setCarregando(false);
  };
  const fetchuser = async () => {
    await createUser(user);
  };

  return (
    <>
      <input
        data-testid="login-name-input"
        type="text"
        placeholder="Insira o seu nome"
        onChange={ handleEvent }
      />
      <button
        data-testid="login-submit-button"
        onClick={ handleConfirm }
        disabled={ lengthCheck() }
      >
        Confirmar
      </button>
      { carregando && <p>Carregando...</p> }
    </>
  );
}

export default Login;
