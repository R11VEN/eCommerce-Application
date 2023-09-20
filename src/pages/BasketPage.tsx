import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CartRepository from '../api/User/Cart.tsx';
import { getOptions } from '../api/User/options.tsx';
import emptyBasket from '../assets/img/empty-basket.png';
import Carts from '../components/Carts.tsx';
import { CAT_ROUTE } from '../constants/pages.ts';
import classes from '../css/ui.module.css';
import { PageProps } from '../interfaces/page.interface.ts';
import { RootState } from '../interfaces/state.interface.ts';
import { savaBasket } from '../redux/basketSlice.ts';
import { CustomResponse, getBasket } from '../utils.ts';

const BasketPage = ({ showName }: PageProps) => {
  const { basket } = useSelector((state: RootState) => state.basket);
  const [modal, setModal] = useState({ display: 'none' });

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
    dispatch(savaBasket({ basket: basket.body }));
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

  const showModal = () => {
    if (modal.display == 'flex') {
      setModal({ display: 'none' });
    } else {
      setModal({ display: 'flex' });
    }
  };

  return (
    <Fragment>
      {cart?.totalLineItemQuantity ? (
        <div className="basket-container">
          <h2>Корзина</h2>
          <span className="discount">20% discount with discount code: Discount20</span>
          <form className="discount-form" onSubmit={addDiscount}>
            <input
              className="discount-input"
              type="text"
              placeholder="Enter discount code"
              onChange={changeHandler}
            ></input>
            <input className="give-discount" type="submit" value={'Give discount'}></input>
          </form>
          <div className="cart-container">
            <Carts lineItems={cart.lineItems}></Carts>
          </div>
          <div className="total-price">
            Total price: {totalPrice + ', ' + basket?.totalPrice?.currencyCode}
          </div>
          <input
            className="delete-cart"
            type="button"
            value={'Delete cart'}
            onClick={showModal}
          ></input>
          <div className={classes.deleteModal} style={modal}>
            <div className={classes.deleteModalBox}>
              <p>Вы уверены, что хотите очистить корзину?</p>
              <div className={classes.deleteModalButtons}>
                <input type="button" value={'Yes'} onClick={deleteCart}></input>
                <input type="button" value={'No'} onClick={showModal}></input>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            <img src={emptyBasket} alt="Empty basket" style={{ maxWidth: '80%' }} />
            <p>
              Nothing here yet... You can visit {<NavLink to={CAT_ROUTE}>Catalog Page</NavLink>} for
              shopping
            </p>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default BasketPage;
