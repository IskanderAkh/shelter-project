import { createContext, useState, useContext } from 'react';

const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <ShippingContext.Provider
      value={{ shippingCost, setShippingCost, selectedCountry, setSelectedCountry }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => useContext(ShippingContext);
