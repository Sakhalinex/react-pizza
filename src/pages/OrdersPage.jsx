import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrdersFromLocalStorage } from '../redux/actions/orders';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(({ orders }) => orders);

  useEffect(() => {
    dispatch(loadOrdersFromLocalStorage());
  }, [dispatch]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusText = status => {
    switch (status) {
      case 'completed':
        return 'Выполнен';
      case 'pending':
        return 'В обработке';
      default:
        return status;
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  return (
    <div className="container" style={{ maxWidth: 800, margin: '40px auto' }}>
      <h2
        style={{
          textAlign: 'center',
          color: '#ff9800',
          marginBottom: 32,
          fontSize: 32,
          fontWeight: 700,
        }}>
        История заказов
      </h2>

      {orders.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 60,
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
          <h3 style={{ color: '#757575', marginBottom: 16 }}>Заказов пока нет</h3>
          <p style={{ color: '#999' }}>Сделайте первый заказ, чтобы увидеть его здесь</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {orders
            .filter(
              order => order && order.id && order.items && Object.keys(order.items).length > 0,
            )
            .map(order => (
              <div
                key={order.id}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid #f0f0f0',
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                    paddingBottom: 16,
                    borderBottom: '1px solid #f0f0f0',
                  }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#333', fontSize: 18 }}>
                      Заказ #{typeof order.id === 'string' ? order.id.slice(-6) : order.id}
                    </h3>
                    <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: 14 }}>
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        padding: '6px 12px',
                        borderRadius: 20,
                        background: getStatusColor(order.status),
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 600,
                      }}>
                      {getStatusText(order.status)}
                    </div>
                    <p
                      style={{
                        margin: '8px 0 0 0',
                        color: '#ff9800',
                        fontSize: 18,
                        fontWeight: 700,
                      }}>
                      {order.totalPrice} ₽
                    </p>
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 12px 0', color: '#333', fontSize: 16 }}>
                    Состав заказа:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {order.items &&
                      Object.entries(order.items).map(([cartKey, item]) => (
                        <div
                          key={cartKey}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            background: '#faf8f6',
                            borderRadius: 8,
                          }}>
                          <div>
                            <p style={{ margin: 0, color: '#333', fontWeight: 500 }}>
                              {item.items && item.items[0] ? item.items[0].name : 'Пицца'}
                            </p>
                            <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: 12 }}>
                              {item.items && item.items[0]
                                ? `${item.items[0].size} см, ${item.items[0].type} тесто`
                                : ''}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ margin: 0, color: '#ff9800', fontWeight: 600 }}>
                              {item.items ? item.items.length : 0} шт.
                            </p>
                            <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: 12 }}>
                              {item.totalPrice || 0} ₽
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
