import React, { useState, useEffect } from 'react';
import { useCart } from '../../Context/CartContext';
import CheckoutModal from '../../components/CheckoutModal/CheckoutModal';
import './cart.scss';
import { Link } from 'react-router-dom';

const countryCityData = {
  Europe: {
    Germany: ['Berlin', 'Hamburg', 'Munich'],
    France: ['Paris', 'Lyon', 'Marseille'],
    Italy: ['Rome', 'Milan', 'Naples'],
    Estonia: ['Tallinn'],
    Latvia: ['Riga'],
    Lithuania: ['Vilnius'],
  },
  Asia: {
    China: ['Beijing', 'Shanghai', 'Guangzhou'],
    Japan: ['Tokyo', 'Osaka', 'Kyoto'],
    India: ['Mumbai', 'Delhi', 'Bangalore'],
    Kyrgyzstan: ['Bishkek', 'Osh'],
    Kazakhstan: ['Almaty', 'Astana'],
    Tajikistan: ['Dushanbe', 'Khujand'],
  },
  'North America': {
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
  },
  Australia: {
    Australia: ['Sydney', 'Melbourne', 'Brisbane'],
  },
};


const shippingRates = {
  Europe: 30,
  Asia: 15,
  'North America': 50,
  'South America': 50,
  Australia: 50,
};

const Cart = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isModalOpen, setModalOpen] = useState(false);
  const [continent, setContinent] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const subtotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const totalWithShipping = subtotal + shippingCost;

  const handleContinentChange = (selectedContinent) => {
    setContinent(selectedContinent);
    setCountry('');
    setCity('');
    setShippingCost(0);
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setCity('');
    const continentKey = Object.keys(countryCityData).find((key) =>
      Object.keys(countryCityData[key]).includes(selectedCountry)
    );
    const cost = shippingRates[continentKey] || 0;
    setShippingCost(cost);
  };

  const handleCheckout = async (orderDetails) => {
    try {
      const response = await fetch('/api/products/buyProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          shippingDetails: {
            continent,
            country,
            city,
            zip,
            shippingCost,
          },
          ...orderDetails,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order successfully processed!');
        clearCart();
        setModalOpen(false);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Checkout failed', error);
    }
  };

  return (
    <div className="cart w-full">
      <h1 className="text-center cart-title mb-16">Shopping Cart</h1>
      <div className="flex w-full">
        <section className="cart-main flex w-full">
          <article className="cart-all flex-1 w-full flex flex-col gap-10 overflow-y-auto">
            {cart.map((product) => (
              <React.Fragment key={product._id}>
                <div className="flex max-w-xl h-32 cart-item relative w-full justify-between">
                  <div className="cart-item-img-wrapper flex gap-10 w-full">
                    <img
                      className="cart-item-img"
                      src={product?.imgs.split(' ')[0]}
                      alt=""
                    />
                    <div className="cart-item-details">
                      <div className="w-full">
                        <h4>{product.name}</h4>
                        <h6>{product.color}</h6>
                        <p>${product.price},00</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex bg-gray-200 h-14 items-center justify-around text-center text-gray-500 gap-4 rounded-md mr-14">
                    <button
                      onClick={() => decrementQuantity(product._id)}
                      className="w-full h-full px-2.5"
                    >
                      -
                    </button>
                    <span className="w-full h-full flex items-center justify-center">
                      {product.quantity}
                    </span>
                    <button
                      className="w-full h-full px-2.5"
                      onClick={() => incrementQuantity(product._id)}
                    >
                      +
                    </button>
                  </div>
                  <div
                    className="absolute right-0 font-bold text-base cursor-pointer"
                    onClick={() => removeFromCart(product._id)}
                  >
                    <img src="/cross.svg" alt="Remove" />
                  </div>
                </div>
                <span className="w-full h-[1px] bg-slate-200 max-w-xl"></span>
              </React.Fragment>
            ))}
          </article>

          <article className="flex-1">
            <div className="cart-summary">
              <h1 className="text-[26px] font-regular">Cart totals</h1>

              <div className="w-full flex justify-between mt-8">
                <p className='w-9/12 font-medium'>SUBTOTAL</p>
                <p className='w-full max-w-[250px] text-[16px]'>${subtotal.toFixed(2)}</p>
              </div>
              <div className='w-full flex justify-between mt-4'>
                <p className='w-9/12 font-medium'>SHIPPING</p>
                <p className='w-full max-w-[250px] text-[16px]'>Shipping costs will be calculated once you have provided address.</p>
              </div>
              <div className="my-2 mt-14">
                <label className='uppercase font-medium'>Calculate Shipping</label>
                <select
                  className="select select-bordered w-full mt-1"
                  value={continent}
                  onChange={(e) => handleContinentChange(e.target.value)}
                >
                  <option value="">Select a continent</option>
                  {Object.keys(countryCityData).map((continent) => (
                    <option key={continent}>{continent}</option>
                  ))}
                </select>
              </div>

              {continent && (
                <div className="my-2">
                  <label>Country</label>
                  <select
                    className="select select-bordered w-full mt-1"
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    {Object.keys(countryCityData[continent]).map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

              {country && (
                <div className="my-2">
                  <label>City</label>
                  <select
                    className="select select-bordered w-full mt-1"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Select a city</option>
                    {countryCityData[continent][country].map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>
              )}

              {country && (
                <div className="my-2">
                  <label>Zip / Post Code</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="input input-bordered w-full mt-1"
                    placeholder="e.g. 12345"
                  />
                </div>
              )}

              {shippingCost > 0 && (
                <div className="flex justify-between mt-3">
                  <p>Shipping</p>
                  <p>${shippingCost.toFixed(2)}</p>
                </div>
              )}

              <div className="flex justify-between font-bold mt-3">
                <p>TOTAL</p>
                <p>${totalWithShipping.toFixed(2)}</p>
              </div>

              <Link
                className="btn mt-5 bg-black text-white w-full hover:text-black"
                onClick={() => setModalOpen(true)}
                disabled={cart.length === 0 || !city || !zip}
                to={'/checkout'}
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </article>
        </section>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCheckout}
      />
    </div>
  );
};

export default Cart;
