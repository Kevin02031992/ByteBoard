import { Link, useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <div className="container-fluid">
        {/* 🔷 Logo / Nombre del sistema */}
        <Link to="/" className="navbar-brand">
          <img
            src="resource/logo_white.png"
            alt="ByteBoard Logo"
            style={{ height: "40px", objectFit: "contain", borderRadius: "0.5rem", }}
          />
        </Link>


        {/* 🔗 Navegación */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/user" className="nav-link text-white">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link to="/access" className="nav-link text-white">Accesos</Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-outline-light d-flex align-items-center gap-2"
                style={{
                  padding: "6px 16px",
                  borderRadius: "30px",
                  fontSize: "0.9rem",
                }}
              >
                <BoxArrowRight size={16} />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
