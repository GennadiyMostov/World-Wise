import styles from './PageNav.module.css';

import { NavLink } from 'react-router-dom';

import Logo from './Logo';

const PageNav = () => {
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
          <NavLink to='/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
