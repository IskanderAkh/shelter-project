import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BurgerIcon from './BurgerIcon';
import { useCart } from '../../Context/CartContext';

const Burger = ({ authUser }) => {
  const [opened, setOpened] = useState(false);
  const { cart } = useCart();

  const toggleMenu = (event) => {
    event.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    document.body.classList.toggle('overflow-hidden');
    setOpened((prevOpened) => !prevOpened);
  };

  const closeMenu = () => {
    setOpened(false);
    document.body.classList.remove('overflow-hidden');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <>
      <div className='flex gap-4'>
        <Link to={"/cart"} className="indicator" onClick={closeMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">{cart.length}</span>
        </Link>

        <label className="swap swap-rotate">
          <input type="checkbox" onClick={toggleMenu} />

          <img src="/burger.svg" alt="" className="swap-off fill-current"></img>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512">
            <polygon
              points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>

      </div>

      {opened && (
        <div className='absolute top-20 left-0 w-screen h-full z-20 bg-primary pl-4 pr-4 pt-8'>
          <label className='input w-full h-8 max-w-96 flex items-center bg-gray-100 gap-2'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="grow burger-search-input" />
          </label>
          <ul className='burger-menu mt-10 gap-6 flex flex-col'>
            <li><Link to='/' className='burger-menu-li' onClick={closeMenu}>Home</Link></li>
            <li onClick={closeMenu}><Link to='/shop' className='burger-menu-li'>Shop</Link></li>
            <li><Link to='/about' className='burger-menu-li' onClick={closeMenu}>About</Link></li>
            <li><Link to='/blog' className='burger-menu-li' onClick={closeMenu}>Blog</Link></li>
            <li><Link to='/help' className='burger-menu-li' onClick={closeMenu}>Help</Link></li>
            <li><Link to='/contact' className='burger-menu-li' onClick={closeMenu}>Contact</Link></li>
            <li><Link to='/search' className='burger-menu-li' onClick={closeMenu}>Search</Link></li>
          </ul>
          <div className='burger-line'></div>
          <ul className='flex flex-col gap-4 mt-6'>
            <li><Link to='/profile' className='burger-menu-li flex gap-2 items-center' onClick={closeMenu}><img src="/profile.svg" alt="Profile" />My account</Link></li>
            <li><button className='burger-menu-li flex gap-2 items-center' onClick={closeMenu}><img src="/logout.svg" alt="Logout" />Logout</button></li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Burger;
