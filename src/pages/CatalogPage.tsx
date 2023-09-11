import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Products from '../api/productsGet.tsx';
import { Card } from '../components/Card';
import { Category } from '../components/Category.tsx';
import classes from '../css/ui.module.css';
import { PageProps } from '../interfaces/page.interface.ts';
import { RootState } from '../interfaces/state.interface.ts';

export const CatalogPage = ({ showName }: PageProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [productsOffset, setPagin] = useState(0);
  const [products, setProducts] = useState<ProductProjectionPagedQueryResponse>();
  const [page, setPage] = useState(1);
  const [filterParam, setFilterParam] = useState('categories:exists');
  const [sortParam, setSortParam] = useState('price asc');
  const [coordinates, setСoordinates] = useState({ left: '0', top: '0' });
  const { value: searchValue } = useSelector((state: RootState) => state.search);
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('*');

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const product = new Products();
      await product
        .getProducts(productsOffset, filterParam, sortParam, searchValue)
        .then((body) => setProducts(body?.body));
      setLoading(false);
    } catch (e) {
      setMessage('Ой!');
    }
  }, [productsOffset, filterParam, sortParam, searchValue]);

  const changePage = useCallback(
    (event: React.MouseEvent) => {
      if ((event.target as HTMLInputElement).className === 'next-page' && products?.total) {
        if (productsOffset < products?.total - products.count) {
          setPagin(productsOffset + 8);
          setPage(page + 1);
        }
      } else if (
        (event.target as HTMLInputElement).className === 'previous-page' &&
        productsOffset > 0
      ) {
        setPagin(productsOffset - 8);
        setPage(page - 1);
      }
    },
    [productsOffset, products, page]
  );

  const updateCatalog = (e: React.MouseEvent) => {
    const categoryItem = e.target as HTMLElement;
    const attribute = categoryItem.getAttribute('data-item');
    const sortAttribute = categoryItem.getAttribute('data-sort');
    if (attribute && attribute !== 'categories:exists') {
      setFilterParam(`categories.id:"${attribute}"`);
    } else if (attribute) {
      setFilterParam('categories:exists');
    }
    if (sortAttribute && sortAttribute !== 'sort') {
      setSortParam(sortAttribute);
    } else if (sortAttribute === 'sort') {
      setСoordinates({
        left: `${categoryItem.getBoundingClientRect().left}px`,
        top: `${categoryItem.getBoundingClientRect().top + 48}px`,
      });
    }
    setPage(1);
    setPagin(0);
  };

  const setManufacturer = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.id !== 'categories:exists') {
      setFilterParam(`variants.attributes.Manufacturer:"${target.id}"`);
    } else {
      setFilterParam('categories:exists');
    }
  };

  useEffect(() => {
    getProducts();
    showName && showName('Catalog Page');
  }, [getProducts, showName]);

  const select = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    if (target.value === 'Цене по возростанию') {
      setSortParam('price asc');
    } else if (target.value === 'Цене по убыванию') {
      setSortParam('price desc');
    } else if (target.value === 'А-Я') {
      setSortParam('name.ru-BY asc');
    } else if (target.value === 'Я-А') {
      setSortParam('name.ru-BY desc');
    }
  };

  const setPrise = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.id === 'min') {
      if (target.value == '') {
        setMinPrice('0');
      } else {
        setMinPrice(target.value);
      }
    } else if (target.id === 'max') {
      if (target.value == '') {
        setMaxPrice('*');
      } else {
        setMaxPrice(target.value);
      }
    }
  };

  useEffect(() => {
    setFilterParam(`variants.price.centAmount:range (${minPrice} to ${maxPrice})`);
  }, [maxPrice, minPrice]);

  return (
    <>
      {loading && <span className="loader"></span>}
      {message ? (
        <div className="message">{message}</div>
      ) : (
        <>
          <div className={classes.category} onClick={updateCatalog}>
            <Category />
            <div className={classes.sortList} style={coordinates}>
              <form>
                <fieldset>
                  <legend>Manufacturer</legend>
                  <div>
                    <input
                      type="radio"
                      name="Manufacturer"
                      id="Schneider Electric"
                      onChange={setManufacturer}
                    ></input>
                    <label>Schneider Electric</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="Manufacturer"
                      id="EMG"
                      onChange={setManufacturer}
                    ></input>
                    <label>EMG</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="Manufacturer"
                      id="SEG"
                      onChange={setManufacturer}
                    ></input>
                    <label>SEG</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="Manufacturer"
                      id="categories:exists"
                      onChange={setManufacturer}
                      defaultChecked
                    ></input>
                    <label>All</label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Сортировать по</legend>
                  <select onInput={select}>
                    <option>Цене по возростанию</option>
                    <option>Цене по убыванию</option>
                    <option>А-Я</option>
                    <option>Я-А</option>
                  </select>
                </fieldset>
                <fieldset>
                  <legend>Диапазон цен</legend>
                  <input
                    max={10000000}
                    type="number"
                    id="min"
                    placeholder="от"
                    onInput={setPrise}
                  ></input>
                  <input
                    max={10000000}
                    type="number"
                    id="max"
                    placeholder="до"
                    onInput={setPrise}
                  ></input>
                </fieldset>
              </form>
            </div>
          </div>
          <div className={classes.cardsContainer}>
            {products?.results.map((item) => {
              if (
                item.masterVariant.prices &&
                item.published &&
                item.masterVariant.images &&
                item.description
              ) {
                if (item.masterVariant.prices[0].discounted) {
                  return (
                    <Card
                      key={item.id}
                      id={item.id}
                      url={item.masterVariant.images[0].url}
                      title={item.name['ru-BY']}
                      price={item.masterVariant.prices[0].value.centAmount}
                      discounted={item.masterVariant.prices[0].discounted.value.centAmount}
                      currency={item.masterVariant.prices[0].value.currencyCode}
                      description={item.description['ru-BY']}
                    />
                  );
                } else {
                  return (
                    <Card
                      key={item.id}
                      id={item.id}
                      url={item.masterVariant.images[0].url}
                      title={item.name['ru-BY']}
                      price={item.masterVariant.prices[0].value.centAmount}
                      currency={item.masterVariant.prices[0].value.currencyCode}
                      description={item.description['ru-BY']}
                    />
                  );
                }
              }
            })}
          </div>
          <div className={classes.btncontainer}>
            <input type="button" className="previous-page" value="<" onClick={changePage} />
            <div>{page}</div>
            <input type="button" className="next-page" value=">" onClick={changePage} />
          </div>
        </>
      )}
    </>
  );
};
