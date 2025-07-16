import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './pp.scss';
import ImageModal from '../../../components/ImageModal/ImageModal';
import { useCart } from '../../../Context/CartContext';
import toast from 'react-hot-toast';
import ProductOverview from './ProductOverview';
import ProductDetails from './ProductDetails';

const ProductPage = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [indexOfSlide, setIndexOfSlide] = useState(0.33)
    const { data: authUser } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await axios.get('/api/auth/me')
                const response = res.data
                return response
            } catch (error) {
                console.log(error);
            }
        }
    })
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await fetch(`/api/animal/${id}`);
            const data = res.json();
            return data;
        }
    });
    const [count, setCount] = useState(1);
    const imgs = product?.imgs.split(' ');
    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    const increment = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };
    const handleAddToCart = (product, count) => {
        if (authUser != undefined) {
            addToCart(product, count);
            setIsCollapsed(true);
        } else {
            toast.error('You need to login first!', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
    }



    const { addToCart } = useCart();
    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className={`w-full h-auto min-h-16 productpage-toastbar pl-10 flex justify-between items-center pr-6 ${isCollapsed ? 'show' : ''}`} id="collapseExample">
                <div className='flex items-center h-full gap-4'>
                    <img src="/added.svg" alt="" />
                    <h3>The item added to your Shopping bag.</h3>
                </div>
                <strong className='gold'>
                    <Link to={'/cart'}>VIEW CART</Link>
                </strong>
            </div>

            <div className={`productpage w-full ${isCollapsed ? 'mt-16' : ''} flex gap-16 `}>
                <div className=' flex gap-10 max-md:ml-0'>
                    <div className='flex gap-10 w-full'>
                        <div className='flex flex-col gap-10 max-lg:hidden'>
                            <ImageModal imgs={imgs} />
                        </div>

                        <Swiper
                            spaceBetween={30}
                            navigation={false}
                            modules={[Navigation, Pagination]}
                            className="mySwiper w-3/4 flex-1 flex flex-col max-lg:w-full"
                            slidesPerView={1}
                            onProgress={
                                (progress) => {
                                    setIndexOfSlide(progress.progress + 0.33);
                                }
                            }
                        >
                            {
                                imgs?.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='w-full'>
                                            <img className='w-full' src={img} alt="" />
                                        </div>

                                    </SwiperSlide>
                                ))
                            }
                            <progress className="progress progress-secondary w-full h-0.5" value={indexOfSlide} min={0.33} max={1.33}></progress>
                        </Swiper>
                    </div>
                </div>
                <ProductDetails
                    authUser={authUser}
                    product={product}
                    count={count}
                    increment={increment}
                    decrement={decrement}
                    handleAddToCart={handleAddToCart}
                />

            </div>
            {/* <ProductOverview product={product} /> */}
        </>
    );
};

export default ProductPage;
