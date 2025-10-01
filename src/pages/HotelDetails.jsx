import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Utensils,
  Dumbbell,
  Waves,
  ArrowLeft,
  Plus,
  Check,
  Calendar,
  Users
} from 'lucide-react';
import './HotelDetails.css';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState('standard');
  const [checkIn, setCheckIn] = useState('2025-03-15');
  const [checkOut, setCheckOut] = useState('2025-03-20');
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    // API call
    setTimeout(() => {
      setHotel({
        id: parseInt(id),
        type: 'hotel',
        name: 'The Taj Mahal Palace',
        location: 'Mumbai, India',
        rating: 4.8,
        reviews: 1245,
        description: 'Experience luxury in the heart of Mumbai at The Taj Mahal Palace. Our elegant accommodations offer stunning harbor views, world-class amenities, and personalized service that exceeds expectations.',
        images: [
          'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        amenities: [
          { name: 'Free WiFi', icon: <Wifi /> },
          { name: 'Swimming Pool', icon: <Waves /> },
          { name: 'Fitness Center', icon: <Dumbbell /> },
          { name: 'Restaurant', icon: <Utensils /> },
          { name: 'Room Service', icon: <Coffee /> },
          { name: 'Parking', icon: <Car /> }
        ],
        rooms: {
          standard: { 
            name: 'Deluxe Room',
            price: 15999, 
            originalPrice: 19999,
            available: 8, 
            features: ['City view', 'King bed', 'Free WiFi', 'Air conditioning'],
            size: '25 sqm'
          },
          deluxe: { 
            name: 'Premium Room',
            price: 24999, 
            originalPrice: 32999,
            available: 5, 
            features: ['Harbor view', 'King bed', 'Balcony', 'Minibar', 'Premium amenities'],
            size: '35 sqm'
          },
          suite: { 
            name: 'Royal Suite',
            price: 45999, 
            originalPrice: 59999,
            available: 2, 
            features: ['Panoramic view', 'Separate living area', 'King bed', 'Jacuzzi', 'Butler service'],
            size: '55 sqm'
          }
        },
        policies: {
          checkIn: '3:00 PM',
          checkOut: '11:00 AM',
          cancellation: 'Free cancellation until 24 hours before check-in'
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const calculateNights = () => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddToCart = () => {
    if (hotel) {
      const hotelBooking = {
        ...hotel,
        roomType: selectedRoom,
        price: hotel.rooms[selectedRoom].price,
        checkIn,
        checkOut,
        guests,
        nights: calculateNights()
      };
      addToCart(hotelBooking);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="hotel-details">
        <div className="container">
          <div className="loading-state">
            <div className="loading"></div>
            <p>Loading hotel details...</p>
          </div>
        </div>
      </div>
    );
  }

  const nights = calculateNights();

  return (
    <div className="hotel-details">
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          <ArrowLeft />
          Back to Results
        </button>

        <div className="hotel-details-card">
          <div className="hotel-gallery">
            <div className="main-image">
              <img src={hotel.images[0]} alt={hotel.name} />
            </div>
            <div className="thumbnail-images">
              {hotel.images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`${hotel.name} ${index + 2}`} />
              ))}
            </div>
          </div>

          <div className="hotel-info">
            <div className="hotel-header">
              <div>
                <h1 className="hotel-name">{hotel.name}</h1>
                <div className="hotel-location">
                  <MapPin className="location-icon" />
                  <span>{hotel.location}</span>
                </div>
              </div>
              <div className="hotel-rating">
                <div className="rating-score">
                  <Star className="star-icon" />
                  <span>{hotel.rating}</span>
                </div>
                <span className="review-count">({hotel.reviews} reviews)</span>
              </div>
            </div>

            <p className="hotel-description">{hotel.description}</p>

            <div className="hotel-amenities">
              <h3>Hotel Amenities</h3>
              <div className="amenities-grid">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <div className="amenity-icon">
                      {amenity.icon}
                    </div>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hotel-policies">
              <h3>Hotel Policies</h3>
              <div className="policies-grid">
                <div className="policy-item">
                  <strong>Check-in:</strong> {hotel.policies.checkIn}
                </div>
                <div className="policy-item">
                  <strong>Check-out:</strong> {hotel.policies.checkOut}
                </div>
                <div className="policy-item">
                  <strong>Cancellation:</strong> {hotel.policies.cancellation}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-section">
          <div className="booking-form">
            <h2>Select Your Stay</h2>
            
            <div className="date-selection">
              <div className="form-group">
                <label htmlFor="checkIn">Check-in</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" />
                  <input
                    type="date"
                    id="checkIn"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="checkOut">Check-out</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" />
                  <input
                    type="date"
                    id="checkOut"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="guests">Guests</label>
                <div className="input-wrapper">
                  <Users className="input-icon" />
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="input"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="room-selection">
              <h3>Choose Your Room</h3>
              <div className="room-options">
                {Object.entries(hotel.rooms).map(([roomType, details]) => (
                  <div 
                    key={roomType}
                    className={`room-card ${selectedRoom === roomType ? 'selected' : ''}`}
                    onClick={() => setSelectedRoom(roomType)}
                  >
                    <div className="room-header">
                      <div>
                        <h4 className="room-name">{details.name}</h4>
                        <p className="room-size">{details.size}</p>
                      </div>
                      <div className="room-pricing">
                        <span className="original-price">₹{details.originalPrice}</span>
                        <span className="current-price">₹{details.price}</span>
                        <span className="price-label">per night</span>
                      </div>
                    </div>
                    
                    <div className="room-features">
                      {details.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <Check className="check-icon" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="room-availability">
                      <span className="available-rooms">
                        {details.available} rooms available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="booking-summary">
            <div className="summary-card">
              <h3>Booking Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Hotel</span>
                  <span>{hotel.name}</span>
                </div>
                <div className="summary-row">
                  <span>Room</span>
                  <span>{hotel.rooms[selectedRoom].name}</span>
                </div>
                <div className="summary-row">
                  <span>Check-in</span>
                  <span>{checkIn}</span>
                </div>
                <div className="summary-row">
                  <span>Check-out</span>
                  <span>{checkOut}</span>
                </div>
                <div className="summary-row">
                  <span>Guests</span>
                  <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="summary-row">
                  <span>Nights</span>
                  <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{hotel.rooms[selectedRoom].price * nights}</span>
                </div>
              </div>
              <button 
                className="btn btn-primary btn-lg book-now"
                onClick={handleAddToCart}
              >
                <Plus className="btn-icon" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;