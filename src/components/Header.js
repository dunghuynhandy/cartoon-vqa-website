import Navbar from './Navbar';
import logo from '../logo.png';
const Header = () => {

  return (
    <div>
      <div class="row p-1" style={{"background-color":"#1E8449"}}>
      <div class="col-4 px-5"></div>
        <div class="col-4 px-5"> <img src={logo}  alt="logo" style={{width:"100%", height:"100%"}} /></div>
        <div class="col-4 px-5"></div>
      </div>
      <div class="row" name="NAV">
        <div className="nav-area"  class="p-0" style={{"background-color":"#186A3B"}}>
          <Navbar />

        </div>

      </div>

    </div>

  );
};

export default Header;