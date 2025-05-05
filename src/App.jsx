import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/auth/authThunks';
import FormLogin from './components/FormLogin';
import FormRegistration from './components/FormRegistration';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import './App.scss'
import About from './pages/About';
import GoogleMapComponent from './components/GoogleMapComponent';
import { FaMapMarked, FaMapMarkedAlt } from 'react-icons/fa';
import Contacts from './pages/Contacts';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => !!state.auth.token);
  const user = useSelector(state => state.auth.user);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMapClick = () => {
    window.open(
      'https://www.google.com/maps/dir/?api=1&destination=50.41950,30.55646',
      '_blank'
    );
  };

  return (
    <>
      <header>
        <div className='container'>
          <nav>
            <ul>
              {/* <li><a href="/">Головна</a></li> */}
              <li><Link to="/about">Про нас</Link></li>
              <li><Link to="/contact">Контакти</Link></li>
              {isAuthenticated ? (
                <>
                  <div className='invite'>
                  <li className='user-name'>Вітаємо, {user?.name || 'Користувач'}</li>
                  <li><button onClick={handleLogout} className="logout-btn">Вийти</button></li>
                  </div>
                </>
              ) : (
                <li><Link to="/login">Увійти</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <FormLogin />} 
        />
        <Route 
          path="/about" 
          element={<About />} 
        />
        <Route 
          path="/contact" 
          element={<Contacts />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" /> : <FormRegistration />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </main>

      {location.pathname !== '/contact' && (
        <footer>
        <div className='container'>
          <div className='footer-map' onClick={handleMapClick}>
          <p className='footer-map__text'>© {new Date().getFullYear()} My Planner App</p>
            <div className='footer-map__info-container'>
            <div className='footer-map__info'>
              <FaMapMarkedAlt className='footer-map__icon'/>
              <span>Our office</span>
            </div>
            <div className='footer-map__map'>
              <GoogleMapComponent />
            </div>
            </div>
          </div>
        </div>
      </footer> 
      )}
      
    </>
  );
}

export default App;