import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CollectionShop from '../../components/CollectionShop/CollectionShop';

const Shop = () => {

  return (
    <div className='mt-24'>
      <h1 className='title text-3xl font-medium mb-9'>Shop The Latest</h1>
      <div>
        <CollectionShop />
      </div>
    </div>
  );
};

export default Shop;
