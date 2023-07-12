import styles from './User.module.css';

import { useAuth } from '../../context/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';

function User() {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate('/');
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <Button type='primary' onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
}

export default User;
