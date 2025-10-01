import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { User, ShoppingCart, Menu, X, Plane } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Plane className="logo-icon" />
            <span className="logo-text">TravelEase</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/search?type=flights" className="nav-link">Flights</Link>
            <Link to="/search?type=hotels" className="nav-link">Hotels</Link>
            <Link to="/search?type=packages" className="nav-link">Packages</Link>
          </nav>

          <div className="user-actions">
            <Link to="/checkout" className="cart-link">
              <ShoppingCart className="cart-icon" />
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>

            {user ? (
              <div className="user-menu">
                <button
                  className="user-button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="user-icon" />
                  <span className="user-name">{user.name}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}

            <button className="mobile-menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="mobile-nav">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/search?type=flights" className="mobile-nav-link" onClick={toggleMenu}>
              Flights
            </Link>
            <Link to="/search?type=hotels" className="mobile-nav-link" onClick={toggleMenu}>
              Hotels
            </Link>
            <Link to="/search?type=packages" className="mobile-nav-link" onClick={toggleMenu}>
              Packages
            </Link>
            {!user && (
              <div className="mobile-auth">
                <Link to="/login" className="btn btn-secondary" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;