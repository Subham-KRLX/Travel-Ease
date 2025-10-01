import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Calendar, 
  MapPin, 
  Plane, 
  Building, 
  Star,
  Clock,
  CreditCard,
  Settings,
  LogOut,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Mock booking data
  const bookings = [
    {
      id: 1,
      type: 'flight',
      status: 'confirmed',
      bookingRef: 'FL001234',
      from: 'Mumbai',
      to: 'Delhi',
      date: '2025-03-15',
      time: '14:30',
      price: 8999,
      airline: 'Air India',
      passengers: 2
    },
    {
      id: 2,
      type: 'hotel',
      status: 'upcoming',
      bookingRef: 'HT005678',
      name: 'The Taj Mahal Palace',
      location: 'Mumbai, India',
      checkIn: '2025-03-15',
      checkOut: '2025-03-20',
      price: 15999,
      nights: 5,
      guests: 2,
      rating: 4.8
    }
  ];

  const renderBookingCard = (booking) => {
    const isUpcoming = new Date(booking.date || booking.checkIn) > new Date();
    
    return (
      <div key={booking.id} className={`booking-card ${booking.type}-booking`}>
        <div className="booking-header">
          <div className="booking-type">
            {booking.type === 'flight' ? <Plane /> : <Building />}
            <span className="booking-ref">{booking.bookingRef}</span>
          </div>
          <div className={`booking-status ${booking.status}`}>
            {booking.status}
          </div>
        </div>

        <div className="booking-content">
          {booking.type === 'flight' ? (
            <div className="flight-booking">
              <div className="flight-route">
                <div className="route-info">
                  <span className="city">{booking.from}</span>
                  <span className="arrow">→</span>
                  <span className="city">{booking.to}</span>
                </div>
                <div className="flight-details">
                  <span className="airline">{booking.airline}</span>
                  <span className="date">{booking.date} at {booking.time}</span>
                </div>
              </div>
              <div className="booking-meta">
                <span className="passengers">{booking.passengers} passengers</span>
                <span className="price">₹{booking.price}</span>
              </div>
            </div>
          ) : (
            <div className="hotel-booking">
              <h3 className="hotel-name">{booking.name}</h3>
              <div className="hotel-location">
                <MapPin className="location-icon" />
                <span>{booking.location}</span>
              </div>
              <div className="hotel-dates">
                <Calendar className="calendar-icon" />
                <span>{booking.checkIn} - {booking.checkOut}</span>
                <span className="nights">({booking.nights} nights)</span>
              </div>
              <div className="booking-meta">
                <div className="hotel-rating">
                  <Star className="star-icon" />
                  <span>{booking.rating}</span>
                </div>
                <span className="price">₹{booking.price}/night</span>
              </div>
            </div>
          )}
        </div>

        <div className="booking-actions">
          {isUpcoming && (
            <>
              <button className="btn btn-secondary btn-sm">Modify</button>
              <button className="btn btn-primary btn-sm">View Details</button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="user-welcome">
            <h1>Welcome back, {user?.name}!</h1>
            <p>Manage your bookings and plan your next adventure</p>
          </div>
          <Link to="/search" className="btn btn-primary">
            <Plus className="btn-icon" />
            New Booking
          </Link>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <div className="sidebar-profile">
              <div className="profile-avatar">
                <User />
              </div>
              <div className="profile-info">
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>

            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                <Calendar />
                <span>My Bookings</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User />
                <span>Profile</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'payment' ? 'active' : ''}`}
                onClick={() => setActiveTab('payment')}
              >
                <CreditCard />
                <span>Payment Methods</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings />
                <span>Settings</span>
              </button>
              <button className="nav-item logout" onClick={logout}>
                <LogOut />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          <div className="dashboard-main">
            {activeTab === 'bookings' && (
              <div className="bookings-section">
                <div className="section-header">
                  <h2>My Bookings</h2>
                  <p>Track and manage your travel bookings</p>
                </div>

                <div className="booking-stats">
                  <div className="stat-card">
                    <div className="stat-icon upcoming">
                      <Clock />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">2</span>
                      <span className="stat-label">Upcoming Trips</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon completed">
                      <Star />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">8</span>
                      <span className="stat-label">Completed Trips</span>
                    </div>
                  </div>
                </div>

                <div className="bookings-list">
                  {bookings.length > 0 ? (
                    bookings.map(renderBookingCard)
                  ) : (
                    <div className="empty-state">
                      <Calendar className="empty-icon" />
                      <h3>No bookings yet</h3>
                      <p>Start planning your next adventure!</p>
                      <Link to="/search" className="btn btn-primary">
                        Browse Deals
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Profile Settings</h2>
                  <p>Manage your account information</p>
                </div>

                <div className="profile-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={user?.name || ''} 
                      className="input"
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={user?.email || ''} 
                      className="input"
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="Add phone number"
                      className="input"
                    />
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-primary">Update Profile</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="payment-section">
                <div className="section-header">
                  <h2>Payment Methods</h2>
                  <p>Manage your saved payment methods</p>
                </div>

                <div className="payment-methods">
                  <div className="payment-card">
                    <div className="card-info">
                      <CreditCard className="card-icon" />
                      <div>
                        <span className="card-number">•••• •••• •••• 4242</span>
                        <span className="card-type">Visa</span>
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-sm">Remove</button>
                  </div>
                  <button className="btn btn-primary add-card">
                    <Plus />
                    Add New Card
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Settings</h2>
                  <p>Customize your experience</p>
                </div>

                <div className="settings-options">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive booking confirmations and updates</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>SMS Notifications</h4>
                      <p>Get text messages for important updates</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;