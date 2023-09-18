import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartRepository from '../api/User/Cart.tsx';
import { getOptions } from '../api/User/options.tsx';
import emptyBasket from '../assets/img/empty-basket.png';
import Carts from '../components/Carts.tsx';
import { PageProps } from '../interfaces/page.interface.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { savaBasket } from '../redux/basketSlice.ts';
import { CustomResponse, getBasket } from '../utils.ts';

const BasketPage = ({ showName }: PageProps) => {
  const { basket } = useSelector((state: RootState) => state.basket);

  useEffect((): void => {
    showName && showName('Корзина');
  }, []);

  const [cart, setCart] = useState<Cart>();
  const [discount, setDiscount] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect((): void => {
    const getCart = async () => {
      const options = getOptions();
      const cartRep = (await new CartRepository(options).getActiveCart()) as ClientResponse<Cart>;
      if (cartRep?.statusCode == 200) {
        setCart(cartRep.body);
        setTotalPrice(cartRep.body.totalPrice.centAmount);
      }
    };
    getCart();
  }, [basket]);

  const deleteCart = async () => {
    const options = getOptions();
    const basket = await new CartRepository(options).deleteCart();
    setCart(undefined);
    setTotalPrice(0);
    dispatch(savaBasket({ basket }));
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscount(event.target.value);
  };

  const addDiscount = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { cartRep, currentCart }: CustomResponse<Cart> = await getBasket();

      await cartRep.addCartDiscount(
        {
          version: currentCart.body.version,
          code: discount,
        },
        currentCart.body.id
      );

      const newCart = (await cartRep.getActiveCart()) as ClientResponse<Cart>;
      setCart(newCart.body);
      setTotalPrice(newCart.body.totalPrice.centAmount);
      dispatch(savaBasket({ basket: newCart.body }));
    } catch (e) {
      throw new Error();
    }
  };

  return (
    <Fragment>
      {cart?.totalLineItemQuantity ? (
        <div className="basket-container">
          <h1>Корзина</h1>
          <form onSubmit={addDiscount}>
            <input type="text" placeholder="Enter discount code" onChange={changeHandler}></input>
            <input type="submit" value={'Give discount'}></input>
          </form>
          <div className="cart-container">
            <Carts lineItems={cart.lineItems}></Carts>
          </div>
          <div className="total-price">
            Total price: {totalPrice + ', ' + basket?.totalPrice?.currencyCode}
          </div>
          <input type="button" value={'Delete cart'} onClick={deleteCart}></input>
        </div>
      ) : (
        <>
          <div>Пацаны, тут нехер ловить!</div>
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            <img src={emptyBasket} alt="Empty basket" style={{ maxWidth: '80%' }} />
          </div>
        </>
      )}
    </Fragment>
  );
};

export default BasketPage;
