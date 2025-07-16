import React, { useState } from 'react';
import AdoptModal from "@/components/AdoptModal/AdoptModal.jsx"; // adjust path


const ProductDetails = ({ product, authUser }) => {
  const [showAdoptModal, setShowAdoptModal] = useState(false);

  return (
    <div className='flex-1 w-full '>
      <div className='product-details'>
        <h2 className='text-3xl product-details-name'>{product?.name}</h2>
        <h2 className='text-2xl product-details-name'>{product?.species}</h2>
        <h2 className='text-2xl product-details-name'>{product?.breed}</h2>

        <p className='mt-6 product-price mb-6'>
          Status: <span className="font-semibold">{product?.adoptionStatus}</span>
        </p>

        <article className='w-8/12 mt-5 text-gray-500 max-xl:w-full'>
          <p>Gender: {product?.gender}</p>
          <p>Age: {product?.age} years</p>
          <p>Health: {product?.healthStatus}</p>
        </article>

        <div className='flex max-w-lg w-full gap-6 mt-12'>
          {authUser && <button
            className='uppercase w-3/4 h-14 btn btn-neutral btn-outline'
            type="button"
            disabled={product?.adoptionStatus !== "Available"}
            onClick={() => setShowAdoptModal(true)}
          >
            {product?.adoptionStatus === "Available" ? "Adopt" : "Not Available"}
          </button>}
          {!authUser && <button
            className='uppercase w-3/4 h-14 btn btn-neutral btn-outline'
            type="button"
            disabled={true}
          >
            Please Login
          </button>}
        </div>

        <div className='flex gap-4 mb-4 mt-9'>
          Animal ID: <p className='text-gray-500'>{product?._id}</p>
        </div>
        <div className='flex gap-4'>
          Added: <p className='text-gray-500'>{new Date(product?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      {showAdoptModal && (
        <AdoptModal
          animalId={product._id}
          onClose={() => setShowAdoptModal(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
