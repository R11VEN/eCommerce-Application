import { useParams } from 'react-router-dom';

export const DetailedProductPage = () => {
  const { id } = useParams();
  // useEffect(() => {
  //   console.log('ID', id);
  // }, [id]);
  return <div>{id}</div>;
};
