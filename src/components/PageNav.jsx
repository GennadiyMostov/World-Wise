import styles from './PageNav.module.css';

import { NavLink } from 'react-router-dom';

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/Pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/Product'>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
