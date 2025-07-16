import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import CountrySelect from './CountrySelect';  // Import the CountrySelect component
import './register.scss';
import toast from 'react-hot-toast';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

// Mapping of country names to country codes


const Register = () => {
  const location = useLocation();
  const [phone, setPhone] = useState('');
  const [next, setNext] = useState(false);

  const { mutate: loginMutation, isPending, isError, error } = useMutation({
    mutationFn: async ({ email, password, firstName, lastName, country, streetAddress, postCode, city, phone }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, firstName, lastName, country, streetAddress, postCode, city, phone }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Registration successful");
      location.pathname = '/';
    },
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    country: '',
    streetAddress: '',
    postCode: '',
    city: '',
    phone: '',
  });

  const goNext = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmpassword) {
      toast.error("You need to fill all the blanks");
    } else {
      setNext(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryChange = (country) => {
    setFormData((prevData) => ({
      ...prevData,
      country,
    }));
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginMutation(formData)
      location.pathname = '/';
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='overflow-hidden flex'>
        {!next && (
          <div className={`flex flex-col gap-4 mt-10 registration-1 w-full`}>
            <div className='flex'>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                className="form-container-input bg-transparent"
                onChange={handleChange}
                required
              />
            </div>
            <span className='border-b border-gray-300'></span>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                className="form-container-input bg-transparent"
                onChange={handleChange}
                required
              />
            </div>
            <span className='border-b border-gray-300'></span>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-container-input bg-transparent"
                required
              />
            </div>
            <span className='border-b border-gray-300'></span>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="form-container-input bg-transparent"
                minLength="6"
                required
              />
            </div>
            <span className='border-b border-gray-300'></span>
            <div>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleChange}
                className="form-container-input bg-transparent"
                minLength="6"
                required
              />
            </div>
            <span className='border-b border-gray-300'></span>
            {!next && (
              <button className="submit-button bg-black text-white w-full py-4 mt-16" type="button" onClick={goNext}>
                {isPending ? "Loading..." : "Next"}
              </button>
            )}
          </div>
        )}

        {next && (
          <div className={`flex flex-col gap-4 mt-10 registration-2 w-full`}>
            <div>
              <CountrySelect onCountryChange={handleCountryChange} />
            </div>
            <span className='border-b border-gray-300'></span>
            <div>
              <input
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                value={formData.streetAddress}
                onChange={handleChange}
                className="form-container-input bg-transparent"
                required
              />
            </div>
            <span className='border-b border-gray-300'></span>
            <div>
              <input
                type="text"
                name="postCode"
                placeholder="Post Code"
                value={formData.postCode}
                onChange={handleChange}
                className="form-container-input bg-transparent"
                required
              />
            </div>
            <span className='border-b border-gray-300'></span>
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="form-container-input bg-transparent"
                required
              />
            </div>
            <span className='border-b border-gray-300'></span>
            <div>
              <PhoneInput
                defaultCountry="us" // Default to a valid country code
                value={phone}
                
                onChange={(phone) => {
                  setPhone(phone);
                  setFormData((prevData) => ({
                    ...prevData,
                    phone,
                  }));
                }}
              />
            </div>
            <span className='border-b border-gray-300'></span>
            <button className="submit-button bg-black text-white w-full py-4" type="button" onClick={() => setNext(!next)}>
              {isPending ? "Loading..." : "Go Back"}
            </button>
            <button className="submit-button bg-black text-white w-full py-4 mt-16" type="submit">
              {isPending ? "Loading..." : "Register"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
