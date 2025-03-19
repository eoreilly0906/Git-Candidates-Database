import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/SavedCandidates" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
