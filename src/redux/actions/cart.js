import axios from 'axios';

const CART_API = 'https://680743a9e81df7060eb96fec.mockapi.io/db/cart';

// Генерация уникального ключа для позиции корзины
const getCartKey = pizzaObj => `${pizzaObj.id}_${pizzaObj.size}_${pizzaObj.type}`;

export const addPizzaToCart = pizzaObj => async dispatch => {
  const cartKey = getCartKey(pizzaObj);
  dispatch({ type: 'ADD_PIZZA_CART', payload: { ...pizzaObj, cartKey } });
  try {
    const { data: cartItems } = await axios.get(`${CART_API}?cartKey=${cartKey}`);
    if (cartItems.length > 0) {
      await axios.put(`${CART_API}/${cartItems[0].id}`, {
        ...cartItems[0],
        count: cartItems[0].count + 1,
      });
    } else {
      await axios.post(CART_API, { ...pizzaObj, cartKey, pizzaId: pizzaObj.id, count: 1 });
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      await axios.post(CART_API, { ...pizzaObj, cartKey, pizzaId: pizzaObj.id, count: 1 });
    } else {
      throw err;
    }
  }
};

export const clearCart = () => async dispatch => {
  dispatch({ type: 'CLEAR_CART' });
  const { data: cartItems } = await axios.get(CART_API);
  await Promise.all(cartItems.map(item => axios.delete(`${CART_API}/${item.id}`)));
};

export const removeCartItem = pizzaObj => async dispatch => {
  const cartKey = getCartKey(pizzaObj);
  dispatch({ type: 'REMOVE_CART_ITEM', payload: cartKey });
  const { data: cartItems } = await axios.get(`${CART_API}?cartKey=${cartKey}`);
  if (cartItems.length > 0) {
    await axios.delete(`${CART_API}/${cartItems[0].id}`);
  }
};

export const plusCartItem = pizzaObj => async dispatch => {
  const cartKey = getCartKey(pizzaObj);
  dispatch({ type: 'PLUS_CART_ITEM', payload: cartKey });
  const { data: cartItems } = await axios.get(`${CART_API}?cartKey=${cartKey}`);
  if (cartItems.length > 0) {
    await axios.put(`${CART_API}/${cartItems[0].id}`, {
      ...cartItems[0],
      count: cartItems[0].count + 1,
    });
  }
};

export const minusCartItem = pizzaObj => async dispatch => {
  const cartKey = getCartKey(pizzaObj);
  dispatch({ type: 'MINUS_CART_ITEM', payload: cartKey });
  const { data: cartItems } = await axios.get(`${CART_API}?cartKey=${cartKey}`);
  if (cartItems.length > 0) {
    if (cartItems[0].count > 1) {
      await axios.put(`${CART_API}/${cartItems[0].id}`, {
        ...cartItems[0],
        count: cartItems[0].count - 1,
      });
    } else {
      await axios.delete(`${CART_API}/${cartItems[0].id}`);
    }
  }
};

export const setCartFromServer = items => ({
  type: 'SET_CART_FROM_SERVER',
  payload: items,
});

export const fetchCartFromServer = () => async dispatch => {
  const { data } = await axios.get(CART_API);
  const items = {};
  data.forEach(cartItem => {
    const cartKey = cartItem.cartKey;
    items[cartKey] = {
      items: Array(cartItem.count).fill({
        id: cartItem.pizzaId,
        name: cartItem.name,
        imageUrl: cartItem.imageUrl,
        price: cartItem.price,
        size: cartItem.size,
        type: cartItem.type,
        cartKey,
      }),
      totalPrice: cartItem.price * cartItem.count,
    };
  });
  dispatch(setCartFromServer(items));
};
