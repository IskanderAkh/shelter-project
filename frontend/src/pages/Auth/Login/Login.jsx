import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/ionicons/eye'

const Login = () => {
  // const [isSignIn, setIsSignIn] = useState(true);
  const location = useLocation()
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(eyeOff);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending, isError, error } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    
      const data = await res.json();
      console.log("LOGIN RESPONSE:", res.status, data);
    
      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }
    
      return data;
    },   

    onSuccess: (data) => {
      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      localStorage.setItem("userType", data.type); // 'user' or 'shelter'

      if (data.type === "admin") {
        window.location.href = "/dashboard"; // or any route for staff
      } else {
        window.location.href = "/";
      }
    },

    onError: () => {
      toast.error("Please check all credentials carefully.");
    }
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);

    setTimeout(() => {
      setFormData({ email: "", password: "" });
    }, 500);
  };


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePassToggle = () => {
    if (type === 'password') {
      setType('text')
      setIcon(eye)
    }
    else if (type === 'text') {
      setType('password')
      setIcon(eyeOff)
    }
  }

  return (
    <div className="form-container">
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 mb-8 mt-32 relative'>
          <input
            type="email"
            placeholder="Email"
            name='email'
            className="form-container-input bg-transparent"
            onChange={handleInputChange}
            value={formData.email} />
          <span className='border-b border-gray-300 '></span>
          <input
            type={type}
            name='password'
            placeholder="Password"
            className="form-container-input mt-10 bg-transparent"
            onChange={handleInputChange}
            value={formData.password} />
          <span className='border-b border-gray-300'></span>
          <span onClick={handlePassToggle} className='absolute right-7 bottom-10'>
            <Icon class="absolute mr-10" icon={icon} size={25} />
          </span>
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button className="submit-button bg-black text-white w-full py-4 mt-16">{isPending ? "Loading..." : "Sign in"}</button>
        <div href="/forgot-password" className="forgot-password text-center">
          <Link to="/forgot-password">
            Have you forgotten your password?
          </Link>
        </div>
      </form>
    </div>
  );
};







export default Login;
