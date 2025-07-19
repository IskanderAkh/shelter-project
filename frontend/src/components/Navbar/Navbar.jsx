import React, { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import Burger from './Burger'
import { useCart } from '../../Context/CartContext'
import { useLocation } from 'react-router-dom'
import ShopMenu from './ShopMenu'
const Navbar = ({ authUser }) => {
    const location = useLocation()
    const { cart } = useCart();

    const cartItemCount = Object.keys(cart)?.length || 0;
    return (
        <div className='navbar m-auto mt-5 pl-0 '>
            <div className="navbar bg-base-100 ">
                <div className="flex-1">
                    <Link to={"/"} className="btn btn-ghost text-xl logo flex gap-0 pl-0"><span>S</span> <p>HELTER</p> </Link>
                </div>
                <div className="flex-none navbar-right">
                    <ul className='flex gap-16 navbar-list relative'>
                        <li>
                            <div className='dropdown'>
                                <summary tabIndex={0} role="button" className={`cursor-pointer transition after:bg-secondary ${location.pathname.includes("/shop") ? "active" : ""}`}> Animals</summary>
                                <div className='dropdown-content z-[10] menu  ' tabIndex={0}>
                                    <ShopMenu />
                                </div>
                            </div>
                        </li>
                        {authUser?.status === 'admin' && (
                            <li><Link to={"/dashboard"} className={`cursor-pointer after:bg-secondary ${location.pathname === "/dashboard" ? "active" : ""}`}>Dashboard</Link></li>

                        )}
                        {/* <li><Link to={"/blog"} className={`cursor-pointer after:bg-secondary ${location.pathname === "/blog" ? "active" : ""}`}>Blog</Link></li> */}
                        <li><Link to={"/about"} className={`cursor-pointer after:bg-secondary ${location.pathname === "/about" ? "active" : ""}`}>Our Story</Link></li>
                    </ul>
                    <div className='line mr-10 ml-10'>
                    </div>

                    <Link to={"/profile"} className="justify-between">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">

                            <div className="w-5">
                                <img
                                    className='w-full h-full '
                                    alt="Tailwind CSS Navbar component"
                                    src="/profile.svg" />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={`burger`}>
                    <Burger />
                </div>
            </div>
        </div>
    )
}

export default Navbar