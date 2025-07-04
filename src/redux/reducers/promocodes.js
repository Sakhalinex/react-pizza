const initialState = {
  appliedPromocode: null,
};

const promocodes = (state = initialState, action) => {
  switch (action.type) {
    case 'APPLY_PROMOCODE':
      return {
        ...state,
        appliedPromocode: action.payload,
      };
    case 'REMOVE_PROMOCODE':
      return {
        ...state,
        appliedPromocode: null,
      };
    default:
      return state;
  }
};

export default promocodes;
