import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Categories,
  PizzaBlock,
  PizzaLoadingBlock,
  SearchInput,
  SortDirectionButton,
  SortPopup,
} from '../components';

import { addPizzaToCart } from '../redux/actions/cart';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortIems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category, search));
  }, [category, sortBy, search, dispatch]);

  const onSelectCategory = React.useCallback(
    index => {
      dispatch(setCategory(index));
    },
    [dispatch],
  );

  const onSelectSortType = React.useCallback(
    type => {
      dispatch(setSortBy(type));
    },
    [dispatch],
  );

  const onChangeSortOrder = React.useCallback(
    order => {
      dispatch(setSortBy({ ...sortBy, order }));
    },
    [dispatch, sortBy],
  );

  const handleAddPizzaToCart = obj => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SortPopup
            activeSortType={sortBy.type}
            items={sortIems}
            onClickSortType={onSelectSortType}
          />
          <SortDirectionButton direction={sortBy.order} onChange={onChangeSortOrder} />
        </div>
      </div>
      <h2
        className="content__title"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>Все пиццы</span>
        <SearchInput value={search} onChange={setSearch} />
      </h2>
      <div className="content__items">
        {isLoaded
          ? items.map(obj => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
