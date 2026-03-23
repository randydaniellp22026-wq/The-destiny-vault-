import { useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/footer/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdminPath && <Navbar />}
      <AppRoutes />
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default App;
