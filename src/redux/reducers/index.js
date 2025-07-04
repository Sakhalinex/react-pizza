import { combineReducers } from 'redux';

import cart from './cart';
import filters from './filters';
import orders from './orders';
import pizzas from './pizzas';
import promocodes from './promocodes';
import reviews from './reviews';

const rootReducer = combineReducers({
  filters,
  pizzas,
  cart,
  orders,
  reviews,
  promocodes,
});

export default rootReducer;
