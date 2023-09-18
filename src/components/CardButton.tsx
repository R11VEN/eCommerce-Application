import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartRepository from '../api/User/Cart';
import { getOptions } from '../api/User/options';
import checked from '../assets/checked.svg';
import plus from '../assets/plus.svg';
import classes from '../css/ui.module.css';
import { RootState } from '../interfaces/state.interface.ts';
import { savaBasket } from '../redux/basketSlice.ts';

export const CardButton = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const { basket } = useSelector((state: RootState) => state.basket);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect((): void => {
    const index = basket?.lineItems?.findIndex((item) => item.productId === id);
    if (index) {
      index > -1 ? setIsAdded(true) : setIsAdded(false);
    }
  }, [basket]);

  const toggleBasket = async (): Promise<CartRepository> => {
    const opt = getOptions();
    const cartRep = new CartRepository(opt);
    const currentCart = (await cartRep.createCartForCurrentCustomer({
      currency: 'EUR',
    })) as ClientResponse<Cart>;

    const remove = async (): Promise<ClientResponse<Cart>> => {
      const item = basket?.lineItems?.find((item) => item.productId === id);
      if (!item?.id) return currentCart;
      return (await cartRep.removeLineItem({
        version: currentCart.body.version,
        lineItemId: item.id,
        quantity: 1,
      })) as ClientResponse<Cart>;
    };

    const add = async (): Promise<ClientResponse<Cart>> => {
      return (await cartRep.updateActiveCart({
        cartId: currentCart.body.id,
        cartUpdateDraft: {
          version: currentCart.body.version,
          productId: id,
          variantId: 1,
          quantity: 1,
        },
      })) as ClientResponse<Cart>;
    };

    const { body } = isAdded ? await remove() : await add();

    setIsAdded(!isAdded);
    dispatch(savaBasket({ basket: body as Cart }));
    return cartRep;
  };

  return (
    <a
      className={`${classes.button} ${classes.cardBtn} ${isAdded && classes.button_remove}`}
      onClick={toggleBasket}
    >
      <img src={isAdded ? checked : plus} alt="" className="button-image" />
      <span className="button-span">{isAdded ? 'Remove from Cart' : 'Add to Cart'}</span>
    </a>
  );
};
