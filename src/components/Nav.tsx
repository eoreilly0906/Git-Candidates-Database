import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      padding: '20px',
      zIndex: 1000
    }}>
      <ul style={{ 
        display: 'flex', 
        listStyle: 'none', 
        padding: 0,
        margin: 0,
        gap: '20px'
      }}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'background-color 0.2s'
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/SavedCandidates" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'background-color 0.2s'
            }}
          >
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
