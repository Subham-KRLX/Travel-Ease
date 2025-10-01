import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Filter, 
  Star, 
  Plane, 
  Clock, 
  MapPin, 
  Wifi, 
  Car,
  Coffee,
  Utensils,
  Plus,
  Check,
  ArrowRight
} from 'lucide-react';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    rating: 0,
    amenities: []
  });
  const [sortBy, setSortBy] = useState('price');
  const { addToCart } = useCart();
  
  const searchType = searchParams.get('type') || 'flights';

  useEffect(() => {
    // API call
    setTimeout(() => {
      setResults(generateMockResults(searchType));
      setLoading(false);
    }, 1500);
  }, [searchType, searchParams]);

  const generateMockResults = (type) => {
    if (type === 'flights') {
      return [
        {
          id: 1,
          type: 'flight',
          airline: 'IndiGo',
          from: 'Mumbai (BOM)',
          to: 'Delhi (DEL)',
          departTime: '14:30',
          arriveTime: '16:45',
          duration: '2h 15m',
          price: 8999,
          stops: 'Non-stop',
          aircraft: 'Airbus A320',
          amenities: ['Wifi', 'Meals', 'Entertainment']
        },
        {
          id: 2,
          type: 'flight',
          airline: 'SpiceJet',
          from: 'Mumbai (BOM)',
          to: 'Delhi (DEL)',
          departTime: '09:15',
          arriveTime: '11:30',
          duration: '2h 15m',
          price: 7549,
          stops: 'Non-stop',
          aircraft: 'Boeing 737',
          amenities: ['Wifi', 'Meals']
        },
        {
          id: 3,
          type: 'flight',
          airline: 'Air India',
          from: 'Bangalore (BLR)',
          to: 'Chennai (MAA)',
          departTime: '22:10',
          arriveTime: '23:25',
          duration: '1h 15m',
          price: 6849,
          stops: 'Non-stop',
          aircraft: 'Airbus A321',
          amenities: ['Wifi', 'Premium Meals', 'Entertainment', 'Extra Legroom']
        },
        {
          id: 4,
          type: 'flight',
          airline: 'Vistara',
          from: 'Delhi (DEL)',
          to: 'Goa (GOI)',
          departTime: '16:20',
          arriveTime: '19:10',
          duration: '2h 50m',
          price: 12999,
          stops: 'Non-stop',
          aircraft: 'Airbus A320',
          amenities: ['Wifi', 'Premium Meals', 'Entertainment', 'Extra Legroom']
        }
      ];
    } else if (type === 'hotels') {
      return [
        {
          id: 4,
          type: 'hotel',
          name: 'The Taj Mahal Palace',
          location: 'Mumbai, India',
          rating: 4.8,
          reviews: 1245,
          price: 15999,
          originalPrice: 19999,
          image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
          amenities: ['Free Wifi', 'Pool', 'Gym', 'Restaurant', 'Room Service'],
          description: 'Luxury heritage hotel in the heart of Mumbai with stunning sea views'
        },
        {
          id: 5,
          type: 'hotel',
          name: 'ITC Grand Central',
          location: 'Mumbai, India',
          rating: 4.2,
          reviews: 892,
          price: 8999,
          originalPrice: 11999,
          image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
          amenities: ['Free Wifi', 'Breakfast', 'Parking'],
          description: 'Comfortable business hotel with excellent service'
        },
        {
          id: 6,
          type: 'hotel',
          name: 'The Oberoi Mumbai',
          location: 'Mumbai, India',
          rating: 4.6,
          reviews: 567,
          price: 24999,
          originalPrice: 32999,
          image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
          amenities: ['Free Wifi', 'Spa', 'Concierge', 'Fine Dining', 'Butler Service'],
          description: 'Elegant luxury hotel with personalized service and panoramic views'
        }
      ];
    }
    return [];
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const renderFlightCard = (flight) => (
    <div key={flight.id} className="result-card flight-card">
      <div className="flight-header">
        <div className="airline-info">
          <div className="airline-logo">
            <Plane className="airline-icon" />
          </div>
          <div>
            <h3 className="airline-name">{flight.airline}</h3>
            <p className="aircraft">{flight.aircraft}</p>
          </div>
        </div>
        <div className="flight-price">
          <span className="price">₹{flight.price}</span>
          <span className="price-label">per person</span>
        </div>
      </div>

      <div className="flight-details">
        <div className="flight-route">
          <div className="departure">
            <span className="time">{flight.departTime}</span>
            <span className="airport">{flight.from}</span>
          </div>
          <div className="flight-path">
            <div className="duration">
              <Clock className="duration-icon" />
              <span>{flight.duration}</span>
            </div>
            <div className="route-line">
              <div className="route-dot"></div>
              <div className="route-dash"></div>
              <div className="route-dot"></div>
            </div>
            <div className="stops">{flight.stops}</div>
          </div>
          <div className="arrival">
            <span className="time">{flight.arriveTime}</span>
            <span className="airport">{flight.to}</span>
          </div>
        </div>
      </div>

      <div className="flight-amenities">
        {flight.amenities.map((amenity, index) => (
          <span key={index} className="amenity-tag">{amenity}</span>
        ))}
      </div>

      <div className="flight-actions">
        <Link to={`/flight/${flight.id}`} className="btn btn-secondary">
          View Details
        </Link>
        <button 
          onClick={() => handleAddToCart(flight)}
          className="btn btn-primary"
        >
          <Plus className="btn-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  const renderHotelCard = (hotel) => (
    <div key={hotel.id} className="result-card hotel-card">
      <div className="hotel-image">
        <img src={hotel.image} alt={hotel.name} />
        <div className="hotel-badge">
          {Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}% OFF
        </div>
      </div>

      <div className="hotel-content">
        <div className="hotel-header">
          <div className="hotel-info">
            <h3 className="hotel-name">{hotel.name}</h3>
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
          {hotel.amenities.slice(0, 5).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
          {hotel.amenities.length > 5 && (
            <span className="amenity-more">+{hotel.amenities.length - 5} more</span>
          )}
        </div>

        <div className="hotel-footer">
          <div className="hotel-pricing">
            <span className="original-price">₹{hotel.originalPrice}</span>
            <span className="current-price">₹{hotel.price}</span>
            <span className="price-label">per night</span>
          </div>
          <div className="hotel-actions">
            <Link to={`/hotel/${hotel.id}`} className="btn btn-secondary btn-sm">
              View Details
            </Link>
            <button 
              onClick={() => handleAddToCart(hotel)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="btn-icon" />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="search-results">
        <div className="container">
          <div className="loading-state">
            <div className="loading"></div>
            <p>Searching for the best {searchType}...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <h1 className="search-title">
            {searchType === 'flights' ? 'Flight' : searchType === 'hotels' ? 'Hotel' : 'Package'} Results
          </h1>
          <p className="search-subtitle">
            Found {results.length} {searchType} for your search
          </p>
        </div>

        <div className="search-content">
          <div className="search-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">
                <Filter className="filter-icon" />
                Filters
              </h3>
              
              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [0, parseInt(e.target.value)]
                    })}
                    className="range-slider"
                  />
                  <div className="price-labels">
                    <span>₹0</span>
                    <span>₹{filters.priceRange[1] * 100}</span>
                  </div>
                </div>
              </div>

              {searchType === 'hotels' && (
                <div className="filter-group">
                  <h4>Rating</h4>
                  <div className="rating-filters">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="rating-filter">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating}
                          onChange={(e) => setFilters({
                            ...filters,
                            rating: parseInt(e.target.value)
                          })}
                        />
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`star ${i < rating ? 'filled' : ''}`}
                            />
                          ))}
                        </div>
                        <span>& above</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sort-section">
              <h3 className="sort-title">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="price">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                {searchType === 'hotels' && (
                  <option value="rating">Rating</option>
                )}
                {searchType === 'flights' && (
                  <option value="duration">Duration</option>
                )}
              </select>
            </div>
          </div>

          <div className="search-results-list">
            {results.length === 0 ? (
              <div className="no-results">
                <p>No results found. Try adjusting your search criteria.</p>
              </div>
            ) : (
              results.map(result => 
                result.type === 'flight' 
                  ? renderFlightCard(result)
                  : renderHotelCard(result)
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;