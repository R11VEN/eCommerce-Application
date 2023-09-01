import { Product } from '@commercetools/platform-sdk';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductItem from '../api/productGet';
import { Slider } from '../components/Slider';
import classes from '../css/ui.module.css';
export const DetailedProductPage = () => {
  const { id } = useParams() as { id: string };
  let name, description, price, img;
  name = description = price = img = '';
  const [item, setProduct] = useState<Product>();
  const getProduct = useCallback(async () => {
    const product = new ProductItem();
    await product.getProduct(id).then((body) => {
      setProduct(body?.body);
    });
  }, [id]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  if (
    item &&
    item.masterData.current.masterVariant.prices &&
    item.masterData.current.description &&
    item.masterData.current.masterVariant.images
  ) {
    name = item.masterData.current.name['ru-BY'];
    price = item.masterData.current.masterVariant.prices[0].value.centAmount;
    description = item.masterData.current.description['ru-BY'];
    img = item.masterData.current.masterVariant.images[0].url;
  }
  return (
    <div>
      <div className={classes.detailedpagecontainer}>
        <h2 className={classes.detailedpageheading}>{name}</h2>
        <Slider images={[img, img, img]}></Slider>
        <div className={classes.pricebox}>
          <p className="detailed-page-price">Price:{price}</p>
          <p className="detailed-page-discounted">Sale:{1}</p>
        </div>
        <p className="detailed-page-description">{description}</p>
      </div>
    </div>
  );
};
