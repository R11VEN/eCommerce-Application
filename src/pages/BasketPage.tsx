import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import CartRepository from '../api/User/Cart.tsx';
import { getOptions } from '../api/User/options.tsx';
import { Card } from '../components/Card';
import { PageProps } from '../interfaces/page.interface.ts';

const BasketPage = ({ showName }: PageProps) => {
  useEffect((): void => {
    showName && showName('Корзина');
  }, []);
  const [cart, setCart] = useState<Cart>(); //Корзина

  //Получаем активную корзину
  useEffect((): void => {
    const getCart = async () => {
      const options = getOptions();
      const cartRep = (await new CartRepository(options).getActiveCart()) as ClientResponse<Cart>;
      if (cartRep?.statusCode == 200) {
        setCart(cartRep.body);
      }
    };
    getCart();
  }, []);

  return (
    <div className="basket-container">
      <h1>Корзина</h1>
      <div className="cart-container">
        {cart?.lineItems.map((item) => {
          if (item.variant.images) {
            if (item.price.discounted) {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  url={item.variant.images[0].url}
                  title={item.name['ru-BY']}
                  price={item.price.value.centAmount}
                  discounted={item.price.discounted.value.centAmount}
                  currency={item.price.value.currencyCode}
                />
              );
            } else {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  url={item.variant.images[0].url}
                  title={item.name['ru-BY']}
                  price={item.price.value.centAmount}
                  currency={item.price.value.currencyCode}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default BasketPage;
