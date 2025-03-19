import { NavLink } from 'react-router-dom';

const Nav = () => { // This is the Nav component
  return (
    <nav style={{ // This is the navigation bar
      position: 'fixed', 
      top: 0,
      left: 0,
      padding: '20px',
      zIndex: 1000
    }}>
      <ul style={{ // This is the unordered list
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
            style={{ // This is the style for the navigation link
              color: '#fff', // This is the color of the navigation link
              textDecoration: 'none', // This is the text decoration of the navigation link
              padding: '8px 16px', // This is the padding of the navigation link
              borderRadius: '4px', // This is the border radius of the navigation link
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // This is the background color of the navigation link
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
            style={{ // This is the style for the navigation link
              color: '#fff', // This is the color of the navigation link
              textDecoration: 'none', // This is the text decoration of the navigation link
              padding: '8px 16px', // This is the padding of the navigation link
              borderRadius: '4px', // This is the border radius of the navigation link
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // This is the background color of the navigation link
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
