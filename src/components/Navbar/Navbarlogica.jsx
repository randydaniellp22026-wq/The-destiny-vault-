import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useNavbarLogica = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleUserClick = () => {
    if (user) {
      navigate('/perfil');
    } else {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    if (e && e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/inventory?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        navigate('/inventory'); // Si está vacío, recarga el catálogo completo
      }
    }
  };

  const onSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/inventory?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/inventory'); // Si está vacío, recarga el catálogo completo
    }
  };

  const handleLogout = (e) => {
    if (e) e.stopPropagation(); // Evitar que el clic en logout active el navigation al perfil
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return { 
    user, 
    isLoggedIn: !!user,
    handleUserClick,
    handleLogout,
    searchQuery,
    setSearchQuery,
    handleSearch,
    onSearchSubmit
  };
};
