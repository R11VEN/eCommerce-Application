import React, { useState } from 'react';

import classes from '../css/ui.module.css';

interface navigationListArr {
  [index: string | number]: { name: string; id: string }[];
}

export const Category = () => {
  const [coordinates, setСoordinates] = useState({ left: '0', top: '0' });
  const [navigationList, setNavigationList] = useState([
    {
      name: 'Воздушные сети',
      id: '8d4efb75-4c0e-46e7-853d-9bfb696425e3',
    },
  ]);

  const openNavList = (e: React.MouseEvent) => {
    const categoryItem = e.target as HTMLElement;

    const navigationListArr: navigationListArr = {
      'categories:exists': [
        {
          name: '',
          id: 'categories:exists',
        },
      ],
      '8a5efa4d-f692-4abf-8110-7b6dd3b06dfe': [
        {
          name: 'Воздушные сети',
          id: '8d4efb75-4c0e-46e7-853d-9bfb696425e3',
        },
        {
          name: 'Кабельные сети',
          id: '8735f41f-6c29-4195-bcad-ea2702830968',
        },
      ],
      'd61e0620-8838-451a-9c0b-126ef0434da1': [
        { name: 'Пускорегулирующая аппаратура', id: 'd58604a3-db9f-430c-923f-90a0e881634a' },
        { name: 'Кулачковые переключатели', id: 'a5d559e6-38ec-4783-bb6a-594f362f73ab' },
        { name: 'Модули управления и сигнализации', id: 'b9955076-2617-4075-8649-ad7c6ac44e02' },
      ],
      '8d981099-a0ec-4721-81d9-14e6b291951c': [
        {
          name: 'Микропроцессорные устройства',
          id: '8d981099-a0ec-4721-81d9-14e6b291951c',
        },
      ],
    };

    const attribute = categoryItem.getAttribute('data-item');

    if (attribute) {
      setNavigationList(navigationListArr[attribute]);
    }
    if (attribute !== 'categories:exists') {
      setСoordinates({
        left: `${categoryItem.getBoundingClientRect().left}px`,
        top: `${categoryItem.getBoundingClientRect().top + 48}px`,
      });
    }
  };

  return (
    <>
      <div className={classes.resetCatalog} data-item={'categories:exists'}>
        Весь товар
      </div>
      <div
        className={classes.categoryItem}
        data-item={'8d981099-a0ec-4721-81d9-14e6b291951c'}
        onMouseOver={openNavList}
      >
        Микропроцессорные устройства
      </div>
      <div
        className={classes.categoryItem}
        data-item={'d61e0620-8838-451a-9c0b-126ef0434da1'}
        onMouseOver={openNavList}
      >
        Автоматизация и промышленный контроль
      </div>
      <div
        className={classes.categoryItem}
        data-item={'8a5efa4d-f692-4abf-8110-7b6dd3b06dfe'}
        onMouseOver={openNavList}
      >
        Индикаторы КЗ
      </div>

      <div className={classes.navigationList} style={coordinates}>
        {navigationList.map((item) => {
          return (
            <div className={classes.navigationListItem} key={item.id} data-item={item.id}>
              {item.name}
            </div>
          );
        })}
      </div>

      <label htmlFor={classes.sortInput} className={classes.openSortList} data-sort={'sort'}>
        Сортировать
      </label>
      <input type="checkbox" id={classes.sortInput}></input>
    </>
  );
};
