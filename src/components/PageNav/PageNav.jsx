import styles from './PageNav.module.css';

import { NavLink } from 'react-router-dom';

import Logo from '../Logo/Logo';

import { useAuth } from '../../context/FakeAuthContext';

const PageNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to='/Pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/Product'>Product</NavLink>
        </li>
        <li>
          <NavLink
            to={isAuthenticated ? '/app' : '/login'}
            className={styles.ctaLink}>
            {isAuthenticated ? 'Back' : 'Login'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
