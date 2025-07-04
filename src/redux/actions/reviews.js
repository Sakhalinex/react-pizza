import axios from 'axios';

const REVIEWS_API = 'https://686750c9e3fefb261ede4439.mockapi.io/db2/reviews';

export const addReview = reviewData => async dispatch => {
  try {
    const review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    await axios.post(REVIEWS_API, review);
    dispatch({ type: 'ADD_REVIEW', payload: review });
  } catch (error) {
    console.error('Error adding review:', error);
  }
};

export const fetchReviews = () => async dispatch => {
  try {
    const { data } = await axios.get(REVIEWS_API);
    dispatch({ type: 'SET_REVIEWS', payload: data });
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};

export const setReviews = reviews => ({
  type: 'SET_REVIEWS',
  payload: reviews,
});
