import SideBar from '../../components/SideBar/SideBar';
import styles from './AppLayout.module.css';
import Map from '../../components/Map/Map';
import User from '../../components/User/User';

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <User />
      <SideBar />
      <Map />
    </div>
  );
};

export default AppLayout;
