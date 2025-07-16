import React from 'react'
import { useQuery } from '@tanstack/react-query';
import Item from '../Item/Item';
import './collection.scss'
import SkeletonItem from '../Item/SkeletonItem';
const Collection = ({ maxItems }) => {


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
    length = 6
    if (isLoading) return <div className='grid grid-cols-3 gap-y-14 collectiondiv justify-center items-center'>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
    </div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='grid grid-cols-4 gap-y-14 gap-x-24 collectiondiv justify-center items-center'>
            {
                products.slice(0, maxItems).map((product) => {
                    console.log(product);
                    
                    return (
                        <Item className="" key={product._id} product={product}>
                        </Item>
                    )
                })
            }
        </div>
    )
}

export default Collection