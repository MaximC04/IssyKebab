import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import StaffPage from './pages/StaffPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-amber-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/cancel" element={<CancelPage />} />
                <Route path="/staff" element={<StaffPage />} />
              </Routes>
            </main>
            <Footer />
            <Toaster position="bottom-center" />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;