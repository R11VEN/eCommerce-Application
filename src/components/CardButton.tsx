import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartRepository from '../api/User/Cart';
import checked from '../assets/checked.svg';
import plus from '../assets/plus.svg';
import classes from '../css/ui.module.css';
import { RootState } from '../interfaces/state.interface.ts';
import { savaBasket } from '../redux/basketSlice.ts';
import { CustomResponse, getBasket } from '../utils.ts';

export const CardButton = ({ id, handleState }: { id: string; handleState?: () => void }) => {
  const dispatch = useDispatch();
  const { basket } = useSelector((state: RootState) => state.basket);
  const [isAdded, setIsAdded] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect((): void => {
    setIsLoading(true);
    const index = basket?.lineItems?.findIndex((item) => item.id === id || item.productId === id);
    if (index) {
      index >= 0 ? setIsAdded(true) : setIsAdded(false);
    }
    setIsLoading(false);
  }, [basket]);

  const toggleBasket = async (): Promise<CartRepository> => {
    const { cartRep, currentCart }: CustomResponse<Cart> = await getBasket();

    const remove = async (): Promise<ClientResponse<Cart>> => {
      const item = basket?.lineItems?.find((item) => item.id === id || item.productId === id);
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
    handleState && handleState();
    return cartRep;
  };

  return (
    <Fragment>
      {isLoading ? (
        <span className="loading"></span>
      ) : (
        <a
          className={`${classes.button} ${classes.cardBtn} ${isAdded && classes.button_remove}`}
          onClick={toggleBasket}
          key={id}
        >
          <img src={isAdded ? checked : plus} alt="" className="button-image" />
          <span className="button-span">{isAdded ? 'Remove from Cart' : 'Add to Cart'}</span>
        </a>
      )}
    </Fragment>
  );
};
