import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <div >
        <Outlet />
      </div>
      <div class="row"  style={{height:"100px", "background-color": "#1E8449"}}></div>
    </div>

  );
};

export default Layout;