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
    </div>
  );
}

export default App;
