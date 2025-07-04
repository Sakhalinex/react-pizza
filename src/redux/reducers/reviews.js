const initialState = {
  reviews: [],
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
      };
    case 'SET_REVIEWS':
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default reviews;
