import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { MapPin, Clock, Shield, Award, Plane, Building, Package } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Clock />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for all your travel needs'
    },
    {
      icon: <Shield />,
      title: 'Secure Booking',
      description: 'Your payments and personal data are always protected'
    },
    {
      icon: <Award />,
      title: 'Best Prices',
      description: 'Compare prices and get the best deals on flights and hotels'
    }
  ];

  const destinations = [
    {
      id: 1,
      name: 'Goa, India',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'From ₹8,999',
      description: 'Beautiful beaches and vibrant nightlife'
    },
    {
      id: 2,
      name: 'Kerala, India',
      image: 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'From ₹12,999',
      description: 'God\'s own country with backwaters'
    },
    {
      id: 3,
      name: 'Rajasthan, India',
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'From ₹6,999',
      description: 'Royal palaces and desert landscapes'
    },
    {
      id: 4,
      name: 'Kashmir, India',
      image: 'https://images.pexels.com/photos/1670770/pexels-photo-1670770.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 'From ₹15,999',
      description: 'Paradise on earth with stunning valleys'
    }
  ];

  const services = [
    {
      icon: <Plane />,
      title: 'Flights',
      description: 'Find the best flight deals worldwide',
      link: '/search?type=flights',
      color: 'var(--primary-blue)'
    },
    {
      icon: <Building />,
      title: 'Hotels',
      description: 'Book comfortable accommodations',
      link: '/search?type=hotels',
      color: 'var(--accent-orange)'
    },
    {
      icon: <Package />,
      title: 'Packages',
      description: 'Complete vacation packages',
      link: '/search?type=packages',
      color: 'var(--success-green)'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <img 
            src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Travel destination"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Journey Begins with 
              <span className="hero-highlight"> TravelEase</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing destinations, book flights and hotels with ease. 
              Your perfect trip is just a few clicks away.
            </p>
          </div>
          
          <div className="hero-search">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="services-header">
            <h2 className="services-title">What We Offer</h2>
            <p className="services-subtitle">
              Everything you need for your perfect trip
            </p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <Link key={index} to={service.link} className="service-card">
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <span className="service-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="destinations">
        <div className="container">
          <div className="destinations-header">
            <h2 className="destinations-title">Popular Destinations</h2>
            <p className="destinations-subtitle">
              Explore the world's most amazing places
            </p>
          </div>
          
          <div className="destinations-grid">
            {destinations.map(destination => (
              <div key={destination.id} className="destination-card">
                <div className="destination-image">
                  <img src={destination.image} alt={destination.name} />
                  <div className="destination-overlay">
                    <div className="destination-price">{destination.price}</div>
                  </div>
                </div>
                <div className="destination-content">
                  <h3 className="destination-name">
                    <MapPin className="destination-icon" />
                    {destination.name}
                  </h3>
                  <p className="destination-description">{destination.description}</p>
                  <Link to={`/search?destination=${destination.name}`} className="destination-link">
                    Explore Deals
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Adventure?</h2>
            <p className="cta-subtitle">
              Join millions of travelers who trust TravelEase for their journeys
            </p>
            <div className="cta-buttons">
              <Link to="/search" className="btn btn-primary btn-lg">
                Start Planning
              </Link>
              <Link to="/signup" className="btn btn-secondary btn-lg">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;