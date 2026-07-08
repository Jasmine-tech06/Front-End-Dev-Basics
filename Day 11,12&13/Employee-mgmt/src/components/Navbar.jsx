import { FaUsers } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import "../styles/navbar.css";

function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="logo-box">
          <FaUsers />
        </div>

        <div>
          <h1>Employee Management</h1>
          <p>Manage your workforce efficiently</p>
        </div>
      </div>

      <div className="search-box">
        <FiSearch />

        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </nav>
  );
}

export default Navbar;