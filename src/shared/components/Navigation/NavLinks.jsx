import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import useAuth from "../../../hooks/useAuth";

export default function NavLinks() {
  const {isLogedIn, logout, userId } = useAuth();
 
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/"> ALL USERS</NavLink>
      </li>
      {isLogedIn && (
        <li>
          <NavLink to={`/${userId}/places`}> MY PLACES</NavLink>
        </li>
      )}

      {isLogedIn && (
        <li>
          <NavLink to="/places/new"> ADD PLACE</NavLink>
        </li>
      )}
      {isLogedIn && <button onClick={logout}>LOGOUT</button>}
      {!isLogedIn && (
        <li>
          <NavLink to="/auth"> AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
}
