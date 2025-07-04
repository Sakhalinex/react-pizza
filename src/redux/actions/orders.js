import axios from 'axios';

const ORDERS_API = 'https://686750c9e3fefb261ede4439.mockapi.io/db2/orders';

export const saveOrder = orderData => async dispatch => {
  try {
    const order = {
      ...orderData,
      date: new Date().toISOString(),
      status: 'completed',
      id: Date.now().toString(),
    };

    await axios.post(ORDERS_API, order);
    dispatch({ type: 'ADD_ORDER', payload: order });
    // Сохраняем в localStorage
    const prevOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([order, ...prevOrders]));
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

export const fetchOrders = () => async dispatch => {
  try {
    const { data } = await axios.get(ORDERS_API);
    dispatch({ type: 'SET_ORDERS', payload: data });
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

export const setOrders = orders => ({
  type: 'SET_ORDERS',
  payload: orders,
});

export const loadOrdersFromLocalStorage = () => dispatch => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  dispatch({ type: 'SET_ORDERS', payload: orders });
};
