import { NavLink } from "react-router-dom";
import { clearToken, getRole } from "../../utils/storage";

const Navbar = () => {
  const role = getRole();

  const handleLogout = () => {
    clearToken();
    window.location.href = "/login";
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">UniTrade</div>
      <nav className="navbar__links">
        <NavLink to="/marketplace">Marketplace</NavLink>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/chatbot">Project Bot</NavLink>
        {role === "hod" || role === "admin" ? (
          <NavLink to="/hod">HOD</NavLink>
        ) : null}
      </nav>
      <div className="navbar__actions">
        {role ? (
          <button type="button" className="btn btn--ghost" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink className="btn btn--primary" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
