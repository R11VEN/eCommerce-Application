import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CartRepository from '../api/User/Cart';
import { getOptions } from '../api/User/options';
import checked from '../assets/checked.svg';
import plus from '../assets/plus.svg';
import classes from '../css/ui.module.css';
import { savaBasket } from '../redux/basketSlice.ts';

export const CardButton = ({ id }: { id: string }) => {
  const [isAdded, setAdding] = useState(false);
  const dispatch = useDispatch();

  const cart = async () => {
    const opt = getOptions();
    const cartRep = new CartRepository(opt);
    const currentCart = (await cartRep.createCartForCurrentCustomer({
      currency: 'EUR',
    })) as ClientResponse<Cart>;

    const { body: basket } = (await cartRep.updateActiveCart({
      cartId: currentCart.body.id,
      cartUpdateDraft: {
        version: currentCart.body.version,
        productId: id,
        variantId: 1,
        quantity: 1,
      },
    })) as ClientResponse<Cart>;

    dispatch(savaBasket({ basket }));
    return cartRep;
  };

  const handleBtnClick = async () => {
    !isAdded || setAdding(!isAdded);
    await cart();
  };

  return (
    <a
      className={`${classes.button} ${classes.cardBtn} ${isAdded && classes.button_inactive}`}
      onClick={handleBtnClick}
    >
      <img src={isAdded ? checked : plus} alt="" className="button-image" />
      <span className="button-span">{isAdded ? 'Added' : 'Add to Cart'}</span>
    </a>
  );
};
