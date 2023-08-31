import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../api/productGet';
import classes from '../css/ui.module.css';
import { Slider } from '../components/slider';
export const DetailedProductPage = () => {
  const { id } = useParams() as { id: string };
  let name, description, price, img;
  const [product, setProduct] = useState<Product>();
  const getProduct = useCallback(async () => {
    const product = new Product();
    await product.getProduct({ ID: id }).then((body) => setProduct(body?.body));
  }, []);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  if (product) {
    name = product.masterData.current.name['ru-BY'];
    price = product.masterData.current.masterVariant.prices[0].value.centAmount;
    description = product.masterData.current.description['ru-BY'];
    img = product.masterData.current.masterVariant.images[0].url;
  }
  return (
    <div>
      <div className={classes.detailedpagecontainer}>
        <h2 className={classes.detailedpageheading}>{name}</h2>
        <Slider images={[img, img, img]}></Slider>
        <div className={classes.pricecontainer}>
          <p className="detailed-page-price">Price:{price}</p>
          <p className="detailed-page-discounted">Sale:{1}</p>
        </div>
        <p className="detailed-page-description">{description}</p>
      </div>
    </div>
  );
};
