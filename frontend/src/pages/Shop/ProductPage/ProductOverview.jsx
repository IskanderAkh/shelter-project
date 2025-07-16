import React from 'react';


const ProductOverview = ({ product }) => {

    return (
        <div className='mt-20'>
            <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title text-xl font-medium">Description</div>
                    <div className="collapse-content">
                        <p className='text-gray-500' dangerouslySetInnerHTML={{ __html: product?.additionalInfo }} />
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">Additional Information</div>
                    <div className="collapse-content">
                        <div className='flex gap-4'>
                            <strong>Material:</strong>  <p className='text-gray-500'>{product?.material}</p>
                        </div>
                        <div className='flex gap-4'>
                            <strong>Size:</strong> <p className='text-gray-500'>{product?.size}</p>
                        </div>
                        <div className='flex gap-4'>
                            <strong>Care:</strong> <p className='text-gray-500'>{product?.care}</p>
                        </div>
                        <div className='flex gap-4'>
                            <strong>Color:</strong> <p className='text-gray-500'>{product?.color}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;
