import axios from 'axios';

const PROMO_API = 'https://686750c9e3fefb261ede4439.mockapi.io/db2/promo';

const PROMOCODES = {
  NASVAI: { discount: 15, description: 'Скидка 15% на весь заказ' },
  BYRTYCH: { discount: 20, description: 'Скидка 20% на весь заказ' },
  ISHKA: { discount: 10, description: 'Скидка 10% на весь заказ' },
  CHLENINEMEUT: { discount: 25, description: 'Скидка 25% на весь заказ' },
};

export const checkPromocode = code => async dispatch => {
  const upperCode = code.toUpperCase();
  try {
    const { data } = await axios.get(`${PROMO_API}?code=${upperCode}`);
    if (data.length > 0) {
      const promocode = data[0];
      dispatch({
        type: 'APPLY_PROMOCODE',
        payload: {
          code: promocode.code,
          discount: Number(promocode.discount),
          description: promocode.description,
          id: promocode.id,
        },
      });
      return { success: true, message: `Промокод применён! ${promocode.description}` };
    } else {
      return { success: false, message: 'Неверный или уже использованный промокод' };
    }
  } catch (e) {
    return { success: false, message: 'Ошибка проверки промокода' };
  }
};

export const removePromocode = () => ({
  type: 'REMOVE_PROMOCODE',
});

export const burnPromocode = id => async dispatch => {
  try {
    await axios.delete(`${PROMO_API}/${id}`);
    dispatch(removePromocode());
  } catch (e) {
    console.error('Ошибка удаления промокода из БД:', e);
  }
};
