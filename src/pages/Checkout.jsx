import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  CreditCard, 
  Lock, 
  Trash2, 
  Plus, 
  Minus,
  MapPin,
  Calendar,
  Users,
  Plane,
  Building
} from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      zipCode: '',
      country: ''
    }
  });
  
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPaymentData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      setProcessing(false);
      navigate('/dashboard', { 
        state: { message: 'Booking confirmed! Check your email for details.' }
      });
    }, 3000);
  };

  const renderCartItem = (item) => (
    <div key={`${item.id}-${item.type}`} className="cart-item">
      <div className="item-icon">
        {item.type === 'flight' ? <Plane /> : <Building />}
      </div>
      
      <div className="item-details">
        {item.type === 'flight' ? (
          <div className="flight-item">
            <h4 className="item-title">{item.airline}</h4>
            <p className="item-subtitle">
              {item.from} → {item.to}
            </p>
            <div className="item-meta">
              <span className="meta-item">
                <Calendar className="meta-icon" />
                {item.departTime}
              </span>
              <span className="meta-item">
                <Users className="meta-icon" />
                {item.class?.charAt(0).toUpperCase() + item.class?.slice(1)}
              </span>
            </div>
          </div>
        ) : (
          <div className="hotel-item">
            <h4 className="item-title">{item.name}</h4>
            <p className="item-subtitle">
              <MapPin className="location-icon" />
              {item.location}
            </p>
            <div className="item-meta">
              {item.checkIn && (
                <span className="meta-item">
                  <Calendar className="meta-icon" />
                  {item.checkIn} - {item.checkOut}
                </span>
              )}
              {item.guests && (
                <span className="meta-item">
                  <Users className="meta-icon" />
                  {item.guests} guests
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="item-quantity">
        <button 
          onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
          className="quantity-btn"
        >
          <Minus />
        </button>
        <span className="quantity">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
          className="quantity-btn"
        >
          <Plus />
        </button>
      </div>

      <div className="item-price">
        <span className="price">${item.price}</span>
        <button 
          onClick={() => removeFromCart(item.id, item.type)}
          className="remove-btn"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="checkout">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <CreditCard />
            </div>
            <h2>Your cart is empty</h2>
            <p>Add some flights or hotels to get started!</p>
            <button 
              onClick={() => navigate('/search')}
              className="btn btn-primary"
            >
              Browse Deals
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your booking</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-main">
            <div className="cart-section">
              <h2>Your Booking</h2>
              <div className="cart-items">
                {cartItems.map(renderCartItem)}
              </div>
            </div>

            <div className="payment-section">
              <h2>Payment Information</h2>
              <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                  <label htmlFor="cardholderName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    placeholder="Full name on card"
                    required
                    className="input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <div className="input-wrapper">
                    <CreditCard className="input-icon" />
                    <input
                      type="text"
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                      className="input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                      className="input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <div className="input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type="text"
                        id="cvv"
                        value={paymentData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123"
                        maxLength="4"
                        required
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                <div className="billing-address">
                  <h3>Billing Address</h3>
                  
                  <div className="form-group">
                    <label htmlFor="street">Street Address</label>
                    <input
                      type="text"
                      id="street"
                      value={paymentData.billingAddress.street}
                      onChange={(e) => handleInputChange('billingAddress.street', e.target.value)}
                      placeholder="123 Main Street"
                      required
                      className="input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        value={paymentData.billingAddress.city}
                        onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                        placeholder="Mumbai"
                        required
                        className="input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        value={paymentData.billingAddress.zipCode}
                        onChange={(e) => handleInputChange('billingAddress.zipCode', e.target.value)}
                        placeholder="400001"
                        required
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      value={paymentData.billingAddress.country}
                      onChange={(e) => handleInputChange('billingAddress.country', e.target.value)}
                      required
                      className="input"
                    >
                      <option value="">Select Country</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={processing}
                  className="btn btn-primary btn-lg complete-booking"
                >
                  {processing ? (
                    <>
                      <div className="loading"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="btn-icon" />
                      Complete Booking
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.type}`} className="summary-item">
                    <span className="item-name">
                      {item.type === 'flight' ? item.airline : item.name}
                    </span>
                    <span className="item-total">
                      ${item.price} × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <div className="summary-row">
                  <span>Taxes & Fees</span>
                  <span>${Math.round(getTotalPrice() * 0.1)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${getTotalPrice() + Math.round(getTotalPrice() * 0.1)}</span>
                </div>
              </div>

              <div className="security-notice">
                <Lock className="security-icon" />
                <p>Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;