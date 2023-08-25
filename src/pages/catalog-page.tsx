import { Card } from '../components/card';

export const CatalogPage = () => {
  return (
    <>
      <div className="cards-container">
        <Card title="Product A" price={25} />
      </div>
    </>
  );
};
