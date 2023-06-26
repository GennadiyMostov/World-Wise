import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
const Home = () => {
  return (
    <div>
      <PageNav />
      <h1>World Wise</h1>
      <Link to='/app'>Go To The App!</Link>
    </div>
  );
};

export default Home;
