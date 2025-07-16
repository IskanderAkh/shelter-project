import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Item from '../Item/Item';

import PriceFilter from './PriceFilter';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

import './shopcarousel.scss'

const ShopCarousel = ({ maxItems }) => {
    const [priceRange, setPriceRange] = useState([0, 180]);
    const [searchTerm, setSearchTerm] = useState('');
    const [onSale, setOnSale] = useState(false);
    const [inStock, setInStock] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
    };

    const { data: products, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch("/api/products/getall");
            const data = await res.json();
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return data;
        }
    });


    const isFiltering = searchTerm || onSale || inStock || priceRange[0] !== 40 || priceRange[1] !== 180;

    const filteredProducts = products?.filter((product) => {

        if (searchTerm && !product?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (product?.price < priceRange[0] || product?.price > priceRange[1]) {
            return false;
        }
        if (onSale && !product?.onSale) {
            return false;
        }
        if (inStock && !product?.inStock) {
            return false;
        }
        return true;
    });

    const productsToDisplay = isFiltering ? filteredProducts : products;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='flex flex-col max-md:flex-col mt-10 shopcarousel'>
            <div className='collection-carousel-filters w-full max-w-none '>
                <div className='flex justify-between items-center w-full'>
                    <h1 className='text-3xl font-medium'>Shop Carousel</h1>
                    <button onClick={() => setShowFilters(!showFilters)} className='flex items-center gap-2 text-carousel-gold text-sm mb-6 md'><img src="/filter.svg" alt="" /> Filters</button>
                </div>
                <div className={`filters-carousel-container ${showFilters ? 'opened' : 'closed'}`}>
                    <form
                        className='border-b border-gray-300 pb-2 w-full flex justify-between relative'
                        onSubmit={(e) => e.preventDefault()} // Prevent default form submission
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full outline-none border-none '
                        />
                        <button type="submit"><img src="/search.svg" alt="" /></button>
                    </form>
                    <div className="collapse collapse-arrow border border-gray-300 mt-4 w-full collection-filters-input">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium collection-filters-input-title">Shop By</div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow border border-gray-300 mt-4 collection-filters-input">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium collection-filters-input-title">Sort By</div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                    <PriceFilter min={0} max={180} onChange={handlePriceChange} />
                    <div className='flex flex-col mt-10 gap-10'>
                        <div className='flex items-center justify-between'>
                            <p>On sale</p>
                            <input
                                type="checkbox"
                                className="toggle toggle-sm [--tglbg:gray] bg-white hover:bg-gray-200"
                                checked={onSale}
                                onChange={(e) => setOnSale(e.target.checked)}
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>In stock</p>
                            <input
                                type="checkbox"
                                className="toggle toggle-sm [--tglbg:gray] bg-white hover:bg-gray-200"
                                checked={inStock}
                                onChange={(e) => setInStock(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Swiper
                breakpoints={{
                    240: { slidesPerView: 1 },
                    320: { slidesPerView: 1 },
                    430: { slidesPerView: 1 },
                    576: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper w-full"
            >
                {
                    productsToDisplay?.slice(0, maxItems).map((product) => {
                        return (
                            <SwiperSlide>
                                <Item className="" key={product?._id} product={product} />
                            </SwiperSlide >

                        )
                    })
                }
            </Swiper>
            {/* <div className='grid grid-cols-3 gap-y-14 gap-x-4 collectiondiv justify-center items-center'>
            </div> */}
        </div>
    )
}

export default ShopCarousel;
