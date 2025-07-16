import React from 'react'
import { Link } from 'react-router-dom'

const ShopMenu = () => {
    return (
        <div className='absolute z-30 -left-10 shopmenu transition'>
            <ul className="menu sm:menu-horizontal bg-white border-gray-300 border md:min-w-max menuShop gap-10 pr-10">
                <li className='p-4'>
                    <ul className='before:opacity-0 pl-0'>
                        <li><p className=' titleText text-black hover:bg-white '>SHOP TYPES</p> </li>
                        <li><Link to={'/shop'} className='text-gray-500 hover:text-black transition'>Pet full width</Link></li>
                        <li><Link to={'/shop'} className='text-gray-500 hover:text-black transition'>Pet With sidebar</Link></li>
                        <li><Link to={'/shop'} className='text-gray-500 hover:text-black transition'>Pet category</Link></li>
                        <li><Link to={'/shop-carousel'} className='text-gray-500 hover:text-black transition'>Pet carousel</Link></li>
                        <li><Link to={'/shop'} className='text-gray-500 hover:text-black transition'>Masonry grid</Link></li>
                    </ul>
                </li>
                {/* <li className='p-4'>
                    <ul>
                        <li><a className=' titleText text-black hover:bg-white'>SINGLE PRODUCT</a> </li>
                        <li><Link className='text-gray-500 hover:text-black transition'>Standard product</Link></li>
                        <li><Link className='text-gray-500 hover:text-black transition'>Variable product</Link></li>
                        <li><Link className='text-gray-500 hover:text-black transition'>On sale product</Link></li>
                        <li><Link className='text-gray-500 hover:text-black transition'>Out of stock product</Link></li>
                        <li><Link className='text-gray-500 hover:text-black transition'>New! Product</Link></li>
                    </ul>
                </li>
                <li className='p-4'>
                    <ul>
                        <li><a className='titleText text-black hover:bg-white cursor-text'>SHOP PAGES</a> </li>
                        <li><Link to={'/cart'} className='text-gray-500 hover:text-black transition'>Cart</Link></li>
                        <li><Link className='text-gray-500 hover:text-black transition'>Checkout</Link></li>
                        <li><Link to={'/profile'} className='text-gray-500 hover:text-black transition'>My account</Link></li>
                        <li><Link className='text-gray-500 hover:text-black transition'>Wishlist</Link></li>
                        <li><Link className='text-gray-500 hover:text-black transition'>Order tracking</Link></li>
                    </ul>
                </li> */}
            </ul>
        </div>
    )
}

export default ShopMenu