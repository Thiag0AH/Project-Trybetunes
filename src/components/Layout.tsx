import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div data-testid="outlet-mockada">
      <Outlet />
      <Header />
    </div>
  );
}

export default Layout;
