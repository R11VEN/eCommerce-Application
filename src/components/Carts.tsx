import { LineItem } from '@commercetools/platform-sdk';
import { Fragment } from 'react';

import { Card } from './Card.tsx';

const printCard = (item: LineItem) => {
  const discounted =
    item.discountedPricePerQuantity.length > 0 &&
    item.discountedPricePerQuantity[0].discountedPrice.value.centAmount;

  const price = item.price.discounted
    ? item.price.discounted.value.centAmount
    : item.price.value.centAmount;

  if (item.variant.images) {
    return (
      <Card
        key={item.id}
        id={item.id}
        url={item.variant.images[0].url}
        title={item.name['ru-BY']}
        price={price}
        discounted={discounted || undefined}
        currency={item.price.value.currencyCode}
      />
    );
  }
};
const Carts = ({ lineItems }: { lineItems: LineItem[] }) => {
  return <Fragment>{lineItems.map(printCard)}</Fragment>;
};

export default Carts;
