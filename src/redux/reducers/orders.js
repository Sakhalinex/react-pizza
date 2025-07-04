const initialState = {
  orders: [],
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default orders;
