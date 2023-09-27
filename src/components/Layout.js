import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <div >
        <Outlet />
      </div>
      <div  style={{height:"100px"}}></div>
    </div>

  );
};

export default Layout;