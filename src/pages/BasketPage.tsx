import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageProps } from '../interfaces/page.interface.ts';
import { good, RootState } from '../interfaces/state.interface.ts';
import { addGood, removeGood } from '../redux/basketSlice.ts';

const BasketPage = ({ showName }: PageProps) => {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket);

  useEffect((): void => {
    showName && showName('Корзина');
  }, [showName]);

  const addHandler = (): void => {
    const id = Date.now().toString();
    const name = 'test';
    dispatch(addGood({ id, name }));
  };
  const removeHandler = (id: string): void => {
    dispatch(removeGood({ id }));
  };

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
    </div>
  );
};

export default BasketPage;
