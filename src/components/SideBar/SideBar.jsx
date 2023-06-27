import styles from './Sidebar.module.css';

import Logo from '../Logo/Logo';
import AppNav from '../AppNav/AppNav';
import Footer from '../Footer/Footer';

import { Outlet } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SideBar;
