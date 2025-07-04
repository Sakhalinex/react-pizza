const PROMO_API = 'https://686750c9e3fefb261ede4439.mockapi.io/db2/promo';

// Список промокодов и скидок
const PROMOCODES = {
  ИШКА: { discount: 10, description: 'Скидка 10% на весь заказ' },
  НАСВАЙ: { discount: 15, description: 'Скидка 15% на весь заказ' },
  КЮА: { discount: 20, description: 'Скидка 20% на весь заказ' },
  ЧЛЕНЫНЕМЕЮТ: { discount: 25, description: 'Скидка 25% на весь заказ' },
  ХАЧУПИТСУ: { discount: 30, description: 'Скидка 30% на весь заказ' },
};

export const checkPromocode = code => (dispatch, getState) => {
  const upperCode = code.trim().toUpperCase();
  // Проверка на повторное использование
  const usedPromos = JSON.parse(localStorage.getItem('usedPromocodes') || '[]');
  if (usedPromos.includes(upperCode)) {
    return { success: false, message: 'Этот промокод уже был использован!' };
  }
  if (PROMOCODES[upperCode]) {
    const promocode = PROMOCODES[upperCode];
    dispatch({
      type: 'APPLY_PROMOCODE',
      payload: {
        code: upperCode,
        discount: promocode.discount,
        description: promocode.description,
      },
    });
    return { success: true, message: `Промокод применён! ${promocode.description}` };
  } else {
    return { success: false, message: 'Неверный промокод' };
  }
};

export const removePromocode = () => ({
  type: 'REMOVE_PROMOCODE',
});

export const burnPromocode = code => dispatch => {
  // Добавляем промокод в usedPromocodes в localStorage
  const upperCode = code.trim().toUpperCase();
  const usedPromos = JSON.parse(localStorage.getItem('usedPromocodes') || '[]');
  if (!usedPromos.includes(upperCode)) {
    usedPromos.push(upperCode);
    localStorage.setItem('usedPromocodes', JSON.stringify(usedPromos));
  }
  dispatch(removePromocode());
};
