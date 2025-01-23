import { NavLink, Link, useNavigate } from "react-router";
import { logOut } from "../../services/authService";
import styles from "./NavBar.module.css";
import Logo from "../../assets/images/logo.svg"

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className={styles.container}>
      <Link to='/'><img src={Logo} alt='A cute owl' /></Link>
      <NavLink to="/">Home</NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/hoots" end>
            Hoots
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/hoots/new">New Hoot</NavLink>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            Log Out 
          </Link>
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}
