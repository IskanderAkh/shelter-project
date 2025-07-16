import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Item from '../Item/Item';
import './collection.scss';
import PriceFilter from './PriceFilter';
import SkeletonItem from '../Item/SkeletonItem';

const CollectionShop = ({ maxItems }) => {
    const [priceRange, setPriceRange] = useState([0, 300]);
    const [searchTerm, setSearchTerm] = useState('');
    const [onSale, setOnSale] = useState(false);
    const [inStock, setInStock] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [selectedBreed, setSelectedBreed] = useState('');

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
    };

    const { data: products, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch("/api/animal/all");
            const data = await res.json();
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return data;
        }
    });

    // Get unique species and breeds
    const speciesOptions = [...new Set(products?.map(p => p.species))];
    const breedOptions = [...new Set(products?.filter(p => p.species === selectedSpecies).map(p => p.breed))];

    const isFiltering = searchTerm || onSale || inStock || selectedSpecies || selectedBreed;

    const filteredProducts = products?.filter((product) => {
        if (searchTerm && !product?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (selectedSpecies && product?.species !== selectedSpecies) {
            return false;
        }
        if (selectedBreed && product?.breed !== selectedBreed) {
            return false;
        }
        if (onSale && !product?.onSale) {
            return false;
        }
        if (inStock && product?.adoptionStatus != "Available" ) {
            return false;
        }
        return true;
    });

    const productsToDisplay = isFiltering ? filteredProducts : products;

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='flex max-md:flex-col'>
            <div className='collection-filters w-full '>
                <button onClick={() => setShowFilters(!showFilters)} className='items-center gap-2 text-gold text-sm mb-6 md'><img src="/filter.svg" alt="" /> Filters</button>
                <div className={`filters-container ${showFilters ? 'opened' : 'closed'}`}>
                    {/* Search Input */}
                    <form
                        className='border-b border-gray-300 pb-2 w-full flex justify-between relative'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full border-none outline-none bg-transparent'
                        />
                        <button type="submit"><img src="/search.svg" alt="" /></button>
                    </form>

                    {/* Species Filter */}
                    <div className='mt-4'>
                        <label className='text-sm font-semibold'>Filter by Species</label>
                        <select
                            className='select select-bordered w-full mt-2'
                            value={selectedSpecies}
                            onChange={(e) => {
                                setSelectedSpecies(e.target.value);
                                setSelectedBreed(''); // Reset breed when species changes
                            }}
                        >
                            <option value="">All Species</option>
                            {speciesOptions.map((sp, idx) => (
                                <option key={idx} value={sp}>{sp}</option>
                            ))}
                        </select>
                    </div>

                    {/* Breed Filter (only if species is selected) */}
                    {selectedSpecies && (
                        <div className='mt-4'>
                            <label className='text-sm font-semibold'>Filter by Breed</label>
                            <select
                                className='select select-bordered w-full mt-2'
                                value={selectedBreed}
                                onChange={(e) => setSelectedBreed(e.target.value)}
                            >
                                <option value="">All Breeds</option>
                                {breedOptions.map((br, idx) => (
                                    <option key={idx} value={br}>{br}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className='flex flex-col mt-10 gap-10'>
                        <div className='flex items-center justify-between'>
                            <p>Available</p>
                            <input
                                type="checkbox"
                                className="toggle toggle-sm [--tglbg:gray] bg-white hover:bg-gray-200 rounded-xl"
                                checked={inStock}
                                onChange={(e) => setInStock(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className='grid grid-cols-4 gap-y-14 gap-x-4 collectiondiv justify-center items-center'>
                {
                    !isLoading && productsToDisplay?.slice(0, maxItems).map((product) => (
                        <Item className="" key={product?._id} product={product} />
                    ))
                }

                {
                    isLoading && (
                        <div className='grid grid-cols-3 gap-y-14 gap-x-4 collectiondiv justify-center items-center'>
                            <SkeletonItem />
                            <SkeletonItem />
                            <SkeletonItem />
                            <SkeletonItem />
                            <SkeletonItem />
                            <SkeletonItem />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CollectionShop;
