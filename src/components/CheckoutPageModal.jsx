// import React, { useState, useEffect } from 'react';
// import './CheckoutPageModal.css'; // Import the CSS file

// const generateOrderId = () => `ORD-${Math.floor(Math.random() * 1000000)}`; // Simple unique ID generator

// const CheckoutPageModal = ({ isOpen, onClose, cartItems, calculateTotalPrice }) => {
//   const [isShippingOpen, setIsShippingOpen] = useState(false);
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [country, setCountry] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [orderId, setOrderId] = useState('');

//   useEffect(() => {
//     if (isOpen) {
//       setOrderId(generateOrderId());
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleInputChange = (setter) => (event) => {
//     setter(event.target.value);
//   };

//   const handlePayment = () => {
//     if (fullName && email && address && city && country && mobileNumber) {
//       // Logic to handle M-Pesa payment integration should be added here
//       alert(`Payment request sent to ${mobileNumber} for order ${orderId}.`);
//       onClose(); // Close modal after payment request
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="modal-close" onClick={onClose}>×</button>
//         <div className="modal-header">
//           <h1>Order Summary</h1>
//         </div>
//         <div className="modal-items">
//           {cartItems.map(item => (
//             <div key={item.id} className="modal-item">
//               <img src={item.image} alt={item.title} className="modal-item-image" />
//               <div className="modal-item-info">
//                 <h3>{item.title}</h3>
//                 <p><strong>Artist:</strong> {item.artist}</p>
//                 <p><strong>Price:</strong> {item.price}</p>
//                 <p><strong>Quantity:</strong> {item.quantity}</p>
//                 <p><strong>Artwork ID:</strong> {item.id}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="modal-total">
//           <h3>Total: Ksh {calculateTotalPrice()}</h3>
//         </div>
//         <div className="order-id">
//           <p><strong>Order ID:</strong> {orderId}</p>
//         </div>
//         <div className="form-section">
//           <button className="collapsible-button" onClick={() => setIsShippingOpen(!isShippingOpen)}>
//             {isShippingOpen ? 'Hide Shipping Details' : 'Add Shipping Details'}
//           </button>
//           {isShippingOpen && (
//             <div className="form-card">
//               <div className="form-card-content">
//                 <input
//                   id="full-name"
//                   type="text"
//                   value={fullName}
//                   onChange={handleInputChange(setFullName)}
//                   placeholder="Full Name"
//                 />
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={handleInputChange(setEmail)}
//                   placeholder="Email"
//                 />
//                 <textarea
//                   id="address"
//                   value={address}
//                   onChange={handleInputChange(setAddress)}
//                   placeholder="Address"
//                 />
//                 <input
//                   id="city"
//                   type="text"
//                   value={city}
//                   onChange={handleInputChange(setCity)}
//                   placeholder="City"
//                 />
//                 <input
//                   id="country"
//                   type="text"
//                   value={country}
//                   onChange={handleInputChange(setCountry)}
//                   placeholder="Country"
//                 />
//               </div>
//             </div>
//           )}
//           <input
//             id="mobile-number"
//             type="text"
//             value={mobileNumber}
//             onChange={handleInputChange(setMobileNumber)}
//             placeholder="Mobile Number"
//           />
//           <button className="payment-button" onClick={handlePayment}>Pay with M-Pesa</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPageModal;

import React, { useState, useEffect } from 'react';
import './CheckoutPageModal.css'; // Import the CSS file

const generateOrderId = () => `ORD-${Math.floor(Math.random() * 1000000)}`; // Simple unique ID generator

const CheckoutPageModal = ({ isOpen, onClose, cartItems, calculateTotalPrice }) => {
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOrderId(generateOrderId());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handlePayment = () => {
    if (fullName && email && address && city && country && mobileNumber) {
      // Logic to handle M-Pesa payment integration should be added here
      alert(`Payment request sent to ${mobileNumber} for order ${orderId}.`);
      onClose(); // Close modal after payment request
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <h1>Order Summary</h1>
        </div>
        <div className="modal-items">
          {cartItems.map(item => (
            <div key={item.artwork_id} className="modal-item">
              <img src={item.image} alt={item.title} className="modal-item-image" />
              <div className="modal-item-info">
                <h3>{item.title}</h3>
                <p><strong>Artist:</strong> {item.artist}</p>
                <p><strong>Price:</strong> {item.price}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Artwork ID:</strong> {item.artwork_id}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-total">
          <h3>Total: Ksh {calculateTotalPrice()}</h3>
        </div>
        <div className="order-id">
          <p><strong>Order ID:</strong> {orderId}</p>
        </div>
        <div className="form-section">
          <button className="collapsible-button" onClick={() => setIsShippingOpen(!isShippingOpen)}>
            {isShippingOpen ? 'Hide Shipping Details' : 'Add Shipping Details'}
          </button>
          {isShippingOpen && (
            <div className="form-card">
              <div className="form-card-content">
                <input
                  id="full-name"
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={handleInputChange(setFullName)}
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                />
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={handleInputChange(setAddress)}
                />
                <input
                  id="city"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={handleInputChange(setCity)}
                />
                <input
                  id="country"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={handleInputChange(setCountry)}
                />
                <input
                  id="mobile-number"
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobileNumber}
                  onChange={handleInputChange(setMobileNumber)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={handlePayment} className="payment-button">Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageModal;


