import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ type = 'flights' }) => {
  const [searchType, setSearchType] = useState(type);
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      type: searchType,
      ...searchData
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  const renderFlightSearch = () => (
    <>
      <div className="search-field">
        <MapPin className="field-icon" />
        <div className="field-content">
          <label>From</label>
          <input
            type="text"
            placeholder="Mumbai, Delhi, Bangalore..."
            value={searchData.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <MapPin className="field-icon" />
        <div className="field-content">
          <label>To</label>
          <input
            type="text"
            placeholder="Delhi, Mumbai, Chennai..."
            value={searchData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <Calendar className="field-icon" />
        <div className="field-content">
          <label>Departure</label>
          <input
            type="date"
            value={searchData.departDate}
            onChange={(e) => handleInputChange('departDate', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <Calendar className="field-icon" />
        <div className="field-content">
          <label>Return</label>
          <input
            type="date"
            value={searchData.returnDate}
            onChange={(e) => handleInputChange('returnDate', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <Users className="field-icon" />
        <div className="field-content">
          <label>Passengers</label>
          <select
            value={searchData.passengers}
            onChange={(e) => handleInputChange('passengers', e.target.value)}
          >
            {[1,2,3,4,5,6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );

  const renderHotelSearch = () => (
    <>
      <div className="search-field">
        <MapPin className="field-icon" />
        <div className="field-content">
          <label>Location</label>
          <input
            type="text"
            placeholder="Goa, Udaipur, Kerala..."
            value={searchData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <Calendar className="field-icon" />
        <div className="field-content">
          <label>Check-in</label>
          <input
            type="date"
            value={searchData.checkIn}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <Calendar className="field-icon" />
        <div className="field-content">
          <label>Check-out</label>
          <input
            type="date"
            value={searchData.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
          />
        </div>
      </div>
      
      <div className="search-field">
        <Users className="field-icon" />
        <div className="field-content">
          <label>Guests</label>
          <select
            value={searchData.guests}
            onChange={(e) => handleInputChange('guests', e.target.value)}
          >
            {[1,2,3,4,5,6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );

  return (
    <div className="search-bar">
      <div className="search-tabs">
        <button
          className={`search-tab ${searchType === 'flights' ? 'active' : ''}`}
          onClick={() => setSearchType('flights')}
        >
          Flights
        </button>
        <button
          className={`search-tab ${searchType === 'hotels' ? 'active' : ''}`}
          onClick={() => setSearchType('hotels')}
        >
          Hotels
        </button>
        <button
          className={`search-tab ${searchType === 'packages' ? 'active' : ''}`}
          onClick={() => setSearchType('packages')}
        >
          Packages
        </button>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-fields">
          {searchType === 'flights' && renderFlightSearch()}
          {searchType === 'hotels' && renderHotelSearch()}
          {searchType === 'packages' && renderFlightSearch()}
        </div>
        
        <button type="submit" className="search-button">
          <Search className="search-icon" />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;