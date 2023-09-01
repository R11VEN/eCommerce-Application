import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { useCallback, useEffect, useState } from 'react';

import Products from '../api/productsGet.tsx';
import { Card } from '../components/card.tsx';
import classes from '../css/ui.module.css';
import { PageProps } from '../interfaces/page.interface.ts';

export const CatalogPage = ({ showName }: PageProps): JSX.Element => {
  useEffect(() => {
    showName && showName('Catalog');
  }, []);
  const [productsOffset, setPagin] = useState(0);
  const [products, setProducts] = useState<ProductProjectionPagedQueryResponse>();
  const [page, setPage] = useState(1);

  const getProducts = useCallback(async () => {
    const product = new Products();
    await product.getProducts(productsOffset).then((body) => setProducts(body?.body));
  }, [productsOffset]);

  const changePage = useCallback(
    (event: React.MouseEvent) => {
      if ((event.target as HTMLInputElement).className === 'next-page' && products?.total) {
        if (productsOffset < products?.total - products.count) {
          setPagin(productsOffset + 8);
          setPage(page + 1);
        }
      } else if (
        (event.target as HTMLInputElement).className === 'previous-page' &&
        productsOffset > 0
      ) {
        setPagin(productsOffset - 8);
        setPage(page - 1);
      }
    },
    [productsOffset, products, page]
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <>
      <div className={classes.cardsContainer}>
        {products?.results.map((item) => {
          if (
            item.masterVariant.prices &&
            item.published &&
            item.masterVariant.images &&
            item.description
          ) {
            if (item.masterVariant.prices[0].discounted) {
              return (
                <Card
                  uniqueKey={item.id}
                  id={item.id}
                  url={item.masterVariant.images[0].url}
                  title={item.name['ru-BY']}
                  price={item.masterVariant.prices[0].value.centAmount}
                  discounted={item.masterVariant.prices[0].discounted.value.centAmount}
                  currency={item.masterVariant.prices[0].value.currencyCode}
                  description={item.description['ru-BY']}
                />
              );
            } else {
              return (
                <Card
                  uniqueKey={item.id}
                  id={item.id}
                  url={item.masterVariant.images[0].url}
                  title={item.name['ru-BY']}
                  price={item.masterVariant.prices[0].value.centAmount}
                  currency={item.masterVariant.prices[0].value.currencyCode}
                  description={item.description['ru-BY']}
                />
              );
            }
          }
        })}
      </div>
      <div className={classes.btncontainer}>
        <input type="button" className="previous-page" value="<" onClick={changePage} />
        <div>{page}</div>
        <input type="button" className="next-page" value=">" onClick={changePage} />
      </div>
    </>
  );
};
