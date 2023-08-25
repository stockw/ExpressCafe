import logo from './logo.svg';
import './App.css';
import { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NewOrderPage from './pages/new_order';
import AuthPage from './pages/auth';
import OrderHistoryPage from './pages/order_history';
import NavBar from './components/nav';



function App() {
  let { user, setUser } = useState(null)

  return (
    <main className="App">
      { user ?
      <>
        <NavBar />
        <Routes>
          <Route path='/orders/new' element={<NewOrderPage />} />
          <Route path='/orders' element={<OrderHistoryPage />} />
        </Routes>
        </>
        :
        <AuthPage />
        }
    </main>
  );
};

export default App;
