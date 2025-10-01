import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Plane, 
  Clock, 
  MapPin, 
  Users, 
  Wifi, 
  Coffee, 
  Utensils,
  Tv,
  ArrowLeft,
  Plus,
  Check
} from 'lucide-react';
import './FlightDetails.css';

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('economy');

  useEffect(() => {
    // API call karenge 
    setTimeout(() => {
      setFlight({
        id: parseInt(id),
        type: 'flight',
        airline: 'Air India',
        from: 'Mumbai (BOM)',
        to: 'Delhi (DEL)',
        departTime: '14:30',
        arriveTime: '16:45',
        duration: '2h 15m',
        aircraft: 'Airbus A320',
        flightNumber: 'AI 131',
        stops: 'Non-stop',
        baggage: '1 x 15kg checked bag included',
        amenities: ['WiFi', 'In-flight Entertainment', 'Meals & Beverages', 'Power Outlets'],
        classes: {
          economy: { price: 8999, seats: 23, features: ['Standard seat', 'Meal included', 'Carry-on bag'] },
          premium: { price: 15999, seats: 8, features: ['Extra legroom', 'Premium meal', 'Priority boarding', 'Carry-on bag'] },
          business: { price: 28999, seats: 4, features: ['Lie-flat seat', 'Gourmet dining', 'Priority check-in', 'Lounge access'] }
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    if (flight) {
      const flightWithClass = {
        ...flight,
        price: flight.classes[selectedClass].price,
        class: selectedClass
      };
      addToCart(flightWithClass);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="flight-details">
        <div className="container">
          <div className="loading-state">
            <div className="loading"></div>
            <p>Loading flight details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flight-details">
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          <ArrowLeft />
          Back to Results
        </button>

        <div className="flight-details-card">
          <div className="flight-header">
            <div className="airline-info">
              <div className="airline-logo">
                <Plane />
              </div>
              <div>
                <h1 className="airline-name">{flight.airline}</h1>
                <p className="flight-number">{flight.flightNumber} • {flight.aircraft}</p>
              </div>
            </div>
          </div>

          <div className="flight-route-details">
            <div className="route-section">
              <div className="departure-info">
                <span className="time">{flight.departTime}</span>
                <span className="airport">{flight.from}</span>
                <span className="date">March 15, 2025</span>
              </div>
              
              <div className="flight-path">
                <div className="path-info">
                  <Clock className="duration-icon" />
                  <span className="duration">{flight.duration}</span>
                </div>
                <div className="route-line">
                  <div className="route-dot"></div>
                  <div className="route-dash">
                    <Plane className="plane-icon" />
                  </div>
                  <div className="route-dot"></div>
                </div>
                <span className="stops">{flight.stops}</span>
              </div>
              
              <div className="arrival-info">
                <span className="time">{flight.arriveTime}</span>
                <span className="airport">{flight.to}</span>
                <span className="date">March 15, 2025</span>
              </div>
            </div>
          </div>

          <div className="flight-amenities">
            <h3>Flight Amenities</h3>
            <div className="amenities-grid">
              {flight.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <div className="amenity-icon">
                    {amenity === 'WiFi' && <Wifi />}
                    {amenity === 'In-flight Entertainment' && <Tv />}
                    {amenity === 'Meals & Beverages' && <Utensils />}
                    {amenity === 'Power Outlets' && <Coffee />}
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="baggage-info">
            <h3>Baggage Information</h3>
            <p>{flight.baggage}</p>
          </div>
        </div>

        <div className="class-selection">
          <h2>Choose Your Class</h2>
          <div className="class-options">
            {Object.entries(flight.classes).map(([classType, details]) => (
              <div 
                key={classType}
                className={`class-card ${selectedClass === classType ? 'selected' : ''}`}
                onClick={() => setSelectedClass(classType)}
              >
                <div className="class-header">
                  <h3 className="class-name">
                    {classType.charAt(0).toUpperCase() + classType.slice(1)}
                  </h3>
                  <div className="class-price">
                    <span className="price">₹{details.price}</span>
                    <span className="price-label">per person</span>
                  </div>
                </div>
                <div className="class-features">
                  {details.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <Check className="check-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="seats-available">
                  <Users className="users-icon" />
                  <span>{details.seats} seats available</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="booking-summary">
          <div className="summary-card">
            <h3>Booking Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Flight</span>
                <span>{flight.from} → {flight.to}</span>
              </div>
              <div className="summary-row">
                <span>Class</span>
                <span>{selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}</span>
              </div>
              <div className="summary-row">
                <span>Passengers</span>
                <span>1 Adult</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{flight.classes[selectedClass].price}</span>
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
  );
};

export default FlightDetails;