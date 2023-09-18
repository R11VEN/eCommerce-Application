import { Cart, ClientResponse, LineItem } from '@commercetools/platform-sdk';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import CartRepository from '../api/User/Cart.tsx';
import { getOptions } from '../api/User/options.tsx';
import classes from '../css/ui.module.css';
import { savaBasket } from '../redux/basketSlice.ts';
import { Card } from './Card.tsx';

const PrintCard = (item: LineItem) => {
  const dispatch = useDispatch();
  const changeQuantity = async (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const id = target.id;
    const opt = getOptions();
    const cartRep = new CartRepository(opt);
    const currentCart = (await cartRep.createCartForCurrentCustomer({
      currency: 'EUR',
    })) as ClientResponse<Cart>;

    const remove = async () => {
      const item = currentCart.body.lineItems?.find((item) => item.id === id);
      if (!item?.id) return currentCart;
      if (item.quantity > 1) {
        (await cartRep.removeLineItem({
          version: currentCart.body.version,
          lineItemId: item.id,
          quantity: 1,
        })) as ClientResponse<Cart>;
      }
    };

    const add = async () => {
      const item = currentCart.body.lineItems?.find((item) => item.id === id);
      if (!item?.id) return currentCart;
      (await cartRep.updateActiveCart({
        cartId: currentCart.body.id,
        cartUpdateDraft: {
          version: currentCart.body.version,
          productId: item?.productId,
          variantId: 1,
          quantity: 1,
        },
      })) as ClientResponse<Cart>;
    };

    if (target.value == '+') {
      await add();
    } else if (target.value == '-') {
      await remove();
    }
    const newCart = (await cartRep.getActiveCart()) as ClientResponse<Cart>;
    dispatch(savaBasket({ basket: newCart.body }));
  };

  const discounted =
    item.discountedPricePerQuantity.length > 0 &&
    item.discountedPricePerQuantity[0].discountedPrice.value.centAmount;

  const price = item.price.discounted
    ? item.price.discounted.value.centAmount
    : item.price.value.centAmount;

  if (item.variant.images) {
    return (
      <div>
        <Card
          key={item.id}
          id={item.id}
          url={item.variant.images[0].url}
          title={item.name['ru-BY']}
          price={price}
          discounted={discounted || undefined}
          currency={item.price.value.currencyCode}
        />
        <div className={classes.cardButtons}>
          <input type="button" value={'-'} id={item.id} onClick={changeQuantity}></input>
          <span>{item.quantity}</span>
          <input type="button" value={'+'} id={item.id} onClick={changeQuantity}></input>
        </div>
      </div>
    );
  }
};
const Carts = ({ lineItems }: { lineItems: LineItem[] }) => {
  return <Fragment>{lineItems.map(PrintCard)}</Fragment>;
};

export default Carts;
