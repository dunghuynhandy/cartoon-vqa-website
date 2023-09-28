import { menuItems } from "../menuItems";
import MenuItems from "./MenuItems";
const Navbar = () => {
  return (
    <nav class="d-flex justify-content-center">
      <ul class="d-flex" style={{"list-style": "none"}} >
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;