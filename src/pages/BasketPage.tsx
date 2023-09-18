import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CartRepository from '../api/User/Cart.tsx';
import { getOptions } from '../api/User/options.tsx';
import { Card } from '../components/Card';
import { PageProps } from '../interfaces/page.interface.ts';
import { savaBasket } from '../redux/basketSlice.ts';

const BasketPage = ({ showName }: PageProps) => {
  useEffect((): void => {
    showName && showName('Корзина');
  }, []);
  const [cart, setCart] = useState<Cart>();
  const [discount, setDiscount] = useState('');
  const dispatch = useDispatch();

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

  const deleteCart = async () => {
    const options = getOptions();
    const basket = await new CartRepository(options).deleteCart();
    setCart(undefined);
    dispatch(savaBasket({ basket }));
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscount(event.target.value);
  };

  const addDiscount = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const opt = getOptions();
      const cartRep = new CartRepository(opt);
      const currentCart = (await cartRep.createCartForCurrentCustomer({
        currency: 'EUR',
      })) as ClientResponse<Cart>;

      await cartRep.addCartDiscount(
        {
          version: currentCart.body.version,
          code: discount,
        },
        currentCart.body.id
      );

      const newCart = (await cartRep.getActiveCart()) as ClientResponse<Cart>;
      setCart(newCart.body);
      dispatch(savaBasket({ basket: newCart.body }));
    } catch (e) {
      throw new Error();
    }
  };

  return (
    <div className="basket-container">
      <h1>Корзина</h1>
      <form onSubmit={addDiscount}>
        <input type="text" placeholder="Enter discount code" onChange={changeHandler}></input>
        <input type="submit" value={'Give discount'}></input>
      </form>
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
                  price={item.totalPrice.centAmount}
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
                  price={item.totalPrice.centAmount}
                  currency={item.price.value.currencyCode}
                />
              );
            }
          }
        })}
      </div>
      <input type="button" value={'Delete cart'} onClick={deleteCart}></input>
    </div>
  );
};

export default BasketPage;
