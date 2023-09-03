import { Product } from '@commercetools/platform-sdk';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductItem from '../api/productGet';
import { Slider } from '../components/Slider';
import classes from '../css/ui.module.css';
import Modal from '../components/Modal';

export const DetailedProductPage = () => {
  const { id } = useParams() as { id: string };
  let name, description, price, discounted, img;
  name = description = price = discounted = img = '';
  const [item, setProduct] = useState<Product>();
  const [modal, setModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  function handleModal(content: string) {
    setContent(content);
    setModal(true);
  }

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
    discounted = item.masterData.current.masterVariant.prices[0].discounted?.value.centAmount;
    description = item.masterData.current.description['ru-BY'];
    img = item.masterData.current.masterVariant.images[0].url;
  }
  return (
    <div>
      <div className={classes.detailedpagecontainer}>
        <h2 className={classes.detailedpageheading}>{name}</h2>
        <Slider images={[img, img, img]} openModal={handleModal}></Slider>
        <div className={classes.pricebox}>
          <p className={`${classes.price} ${discounted && classes.discount}`}>
            Price:
            {new Intl.NumberFormat('pl', {
              style: 'currency',
              currency: 'EUR',
              currencySign: 'accounting',
            }).format(+price)}
          </p>
          {discounted && (
            <p className={classes.discountprice}>
              Sale:
              {new Intl.NumberFormat('pl', {
                style: 'currency',
                currency: 'EUR',
                currencySign: 'accounting',
              }).format(+discounted)}
            </p>
          )}
        </div>
        <p className={classes.detailedpagedescription}>{description}</p>
        <Modal visible={modal} setDisplay={setModal} images={[img, img, img]}>
          {content && content}
        </Modal>
      </div>
    </div>
  );
};
