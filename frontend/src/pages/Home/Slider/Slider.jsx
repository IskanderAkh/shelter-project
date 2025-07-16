import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './slider.scss';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function App() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                modules={[Pagination, Autoplay]}
                className={`mySwiper rounded-2xl`}
            >
                <SwiperSlide className='relative'>
                    <img src="./hero.jpg" alt="" className='headerslider-img rounded-lg h-[786px] object-cover w-full ' />
                    <div className='w-full h-full absolute top-0 bg-black opacity-60'></div>
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Dang good dogs </h1>
                        <Link to={'/shop'} className='text-xl font-bold  slider_btn'>View Angel</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src="./hero-1.jpg" alt="" className='headerslider-img rounded-lg h-[786px] object-cover w-full ' />
                    <div className='w-full h-full absolute top-0 bg-black opacity-60'></div>
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Doggies </h1>
                        <Link to={'/shop'} className='text-xl font-bold  slider_btn'>View Angel</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src="./hero-2.jpg" alt="" className='headerslider-img rounded-lg h-[786px] object-cover w-full ' />
                    <div className='w-full h-full absolute top-0 bg-black opacity-60'></div>
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Kitties </h1>
                        <Link to={'/shop'} className='text-xl font-bold  slider_btn'>View Angel</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src="./hero-3.jpg" alt="" className='headerslider-img rounded-lg h-[786px] object-cover w-full ' />
                    <div className='w-full h-full absolute top-0 bg-black opacity-60'></div>
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Goats </h1>
                        <Link to={'/shop'} className='text-xl font-bold  slider_btn'>View Angel</Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src="./hero-4.jpg" alt="" className='headerslider-img rounded-lg h-[786px] object-cover w-full ' />
                    <div className='w-full h-full absolute top-0 bg-black opacity-60'></div>
                    <div className='absolute top-1/2 left-40 -translate-x-1/2 -translate-y-1/2 text-center text-white slider-text'>
                        <h1 className='text-3xl font-medium'>Mini piggies</h1>
                        <Link to={'/shop'} className='text-xl font-bold  slider_btn'>View Angel</Link>
                    </div>
                </SwiperSlide>


            </Swiper>
        </>
    );
}
