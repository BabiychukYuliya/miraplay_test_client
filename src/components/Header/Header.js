import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div>
        <nav>
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <NavLink to="/auth">
            <p>Реєстрація</p>
          </NavLink>
          <NavLink to="/games">Ігри</NavLink>
        </nav>
      </div>
    </header>
  );
};
export default Header;
