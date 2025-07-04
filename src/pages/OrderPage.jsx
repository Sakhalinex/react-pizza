import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearCart } from '../redux/actions/cart';

const OrderPage = ({ showNotification }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // Имитация оплаты
    await new Promise(res => setTimeout(res, 1800));
    setLoading(false);
    const isSuccess = Math.random() > 0.1; // 90% успеха
    if (isSuccess) {
      dispatch(clearCart());
      showNotification('Оплата прошла успешно! Спасибо за заказ!', 'success');
      history.push('/');
    } else {
      showNotification('Ошибка оплаты. Попробуйте ещё раз.', 'error');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420, margin: '40px auto' }}>
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
          padding: 32,
          marginTop: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <h2 style={{ marginBottom: 24, color: '#ff9800', fontWeight: 700 }}>Оформление заказа</h2>
        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Имя"
            required
            style={inputStyle}
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Телефон"
            required
            style={inputStyle}
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Адрес доставки"
            required
            style={inputStyle}
          />
          <button
            type="submit"
            className="button button--cart"
            disabled={loading || totalPrice === 0}
            style={{ fontSize: 20, marginTop: 8 }}>
            {loading ? 'Оплата...' : `Оплатить ${totalPrice} ₽`}
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '14px 18px',
  borderRadius: 8,
  border: '1px solid #eee',
  fontSize: 17,
  outline: 'none',
  marginBottom: 0,
  background: '#faf8f6',
  transition: 'border 0.2s',
};

export default OrderPage;
