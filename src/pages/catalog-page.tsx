import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { useCallback, useEffect, useState } from 'react';

import Products from '../api/productsGet.tsx';
import { Button } from '../components/button.tsx';
import { Card } from '../components/card.tsx';
import classes from '../css/ui.module.css';

export const CatalogPage = () => {
  const [products, setProducts] = useState<ProductPagedQueryResponse>();
  const getProducts = useCallback(async () => {
    const product = new Products();
    await product.getProducts().then((body) => setProducts(body?.body));
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <>
      <div className={classes.cardsContainer}>
        {products?.results.map((item) => {
          if (
            item.masterData.current.masterVariant.prices &&
            item.masterData.published &&
            item.masterData.current.masterVariant.images &&
            item.masterData.current.description
          ) {
            return (
              <Card
                uniqueKey={item.id}
                id={item.id}
                url={item.masterData.current.masterVariant.images[0].url}
                title={item.masterData.current.name['ru-BY']}
                price={item.masterData.current.masterVariant.prices[0].value.centAmount}
                discounted={1}
                description={item.masterData.current.description['ru-BY']}
              />
            );
          }
        })}
      </div>
      <div className={classes.btncontainer}>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </div>
    </>
  );
};
