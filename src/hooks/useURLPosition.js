import { useSearchParams } from 'react-router-dom';
const useURLPosition = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  return [lat, lon];
};

export { useURLPosition };
