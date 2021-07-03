import { api } from '../../api/api';

export const setLoaded = payload => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchPizzas = (sortBy, category, search) => dispatch => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });

  // Формируем query string
  let queryParams = [];

  if (search && search.trim()) {
    queryParams = [`search=${encodeURIComponent(search.trim())}`];
  } else {
    if (category !== undefined && category !== null) {
      queryParams.push(`category=${category}`);
    }
    if (sortBy?.type) {
      queryParams.push(`sortBy=${sortBy.type}`);
      queryParams.push(`order=${sortBy.order}`);
    }
  }

  const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
  const url = `/pizzas${queryString}`;

  api.get(url).then(({ data }) => {
    dispatch(setPizzas(data));
  });
};

export const setPizzas = items => ({
  type: 'SET_PIZZAS',
  payload: items,
});
