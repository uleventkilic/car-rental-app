import { Link } from "react-router-dom";
import "../styles.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Anasayfa</Link>
      <Link to="/cars">Araçlar</Link>
      <Link to="/login">Giriş</Link>
      <Link to="/register">Kayıt</Link>
    </nav>
  );
};

export default Navbar;
