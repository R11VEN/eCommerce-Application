import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { useState } from 'react';

import CartRepository from '../api/User/Cart';
import { getOptions } from '../api/User/options';
import checked from '../assets/checked.svg';
import plus from '../assets/plus.svg';
import classes from '../css/ui.module.css';

export const CardButton = ({ id }: { id: string }) => {
  const [isAdded, setAdding] = useState(false);

  const cart = async () => {
    const opt = getOptions();
    const cartRep = new CartRepository(opt);
    const currentCart = (await cartRep.createCartForCurrentCustomer({
      currency: 'EUR',
    })) as ClientResponse<Cart>;

    await cartRep.updateActiveCart({
      cartId: currentCart.body.id,
      cartUpdateDraft: {
        version: currentCart.body.version,
        productId: id,
        variantId: 1,
        quantity: 1,
      },
    });
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
