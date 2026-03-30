import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import useAuth from '../hooks/useAuth';
import '../navbar_hook.css';

const NavbarHook = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: '1150px' });
  const { auth } = useAuth();

  // Derive username directly — no useEffect + useState needed
  const username = auth?.username || auth?.user || '';

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMobileMenu = () => {
    if (isMobile) setIsMenuOpen(false);
  };

  const renderNavLinks = () => {
    const listClassName = isMobile ? 'nav__list' : 'nav__list__web';

    return (
      <ul className={listClassName}>
        <li>
          <NavLink to="/calendar" className="nav__link" onClick={closeMobileMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/pendings" className="nav__link" onClick={closeMobileMenu}>
            Pending Vacations
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="nav__link" onClick={closeMobileMenu}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/request"
            className="nav__link nav__cta"
            onClick={closeMobileMenu}
          >
            Request Vacation
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          {username}
        </NavLink>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
            className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </header>
  );
};

export default NavbarHook;
