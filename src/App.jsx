import React from 'react';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/footer/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
