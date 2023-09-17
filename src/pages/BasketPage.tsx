import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartRepository from '../api/User/Cart.tsx';
import { getOptions } from '../api/User/options.tsx';
import { Card } from '../components/Card';
import { PageProps } from '../interfaces/page.interface.ts';
import { good, RootState } from '../interfaces/state.interface.ts';
import { addGood, removeGood } from '../redux/basketSlice.ts';

const BasketPage = ({ showName }: PageProps) => {
  useEffect((): void => {
    showName && showName('Корзина');
  }, [showName]);
  const [cart, setCart] = useState<Cart>(); //Корзина

  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket);

  const addHandler = (): void => {
    const id = Date.now().toString();
    const name = 'test';
    dispatch(addGood({ id, name }));
  };
  const removeHandler = (id: string): void => {
    dispatch(removeGood({ id }));
  };

  //Получаем активную корзину
  useEffect((): void => {
    const getCart = async () => {
      const optins = getOptions();
      const cartRep = (await new CartRepository(optins).getActiveCart()) as ClientResponse<Cart>;
      if (cartRep?.statusCode == 200) {
        setCart(cartRep.body);
      }
    };
    getCart();
  }, []);

  const printGood = (good: good) => {
    return (
      <div className="list-goods" key={good.id}>
        <div>{good.id}</div>
        <div>{good.name}</div>
        <div onClick={() => removeHandler(good.id)}>Remove good</div>
      </div>
    );
  };

  return (
    <div className="basket-container">
      <h1>Корзина</h1>
      <div onClick={addHandler}>Add good</div>
      {basket.goods.map(printGood)}
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
