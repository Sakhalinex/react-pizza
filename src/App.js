import React, { useCallback, useState } from 'react';
import { Route } from 'react-router-dom';
import { Header } from './components';
import Notification from './components/Notification';
import { Cart, Home } from './pages';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  const [notification, setNotification] = useState({
    message: '',
    type: 'success',
    visible: false,
  });

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type, visible: true });
  }, []);

  const handleClose = useCallback(() => {
    setNotification(n => ({ ...n, visible: false }));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={handleClose}
      />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/orders" component={OrdersPage} exact />
        <Route
          path="/order"
          render={() => <OrderPage showNotification={showNotification} />}
          exact
        />
      </div>
      <footer
        style={{
          background: '#222',
          color: '#fff',
          padding: '32px 0 24px 0',
          marginTop: 48,
          textAlign: 'center',
          borderTop: '4px solid #ff9800',
          fontFamily: 'inherit',
        }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: '#ff9800' }}>
            React Pizza 🍕
          </div>
          <div style={{ fontSize: 16, color: '#bbb' }}>Самая вкусная пицца во вселенной</div>
          <div style={{ margin: '8px 0', fontSize: 15 }}>
            © {new Date().getFullYear()} Sakhalinex
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 6 }}>
            <a
              href="https://github.com/Sakhalinex/react-pizza"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ff9800', textDecoration: 'none', fontWeight: 600 }}>
              GitHub
            </a>
            <a
              href="https://686750c9e3fefb261ede4439.mockapi.io/db2/orders"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ff9800', textDecoration: 'none', fontWeight: 600 }}>
              MockAPI Orders
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
