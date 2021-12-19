import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav>
        <Link to="/" className="link">
        <h2 className="head-logo">NeoKeep</h2>
        </Link>
        <div>
          <Link to="/login">
          <button className="nav-btn">Login</button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Header;
