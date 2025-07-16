import React, { useState } from 'react';

const Order = ({ cartItems = [], shippingCost = 0 }) => {
    const [paymentType, setPaymentType] = useState('Credit Card');

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shippingCost;

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-6 mt-10">Your Order</h1>
            <div className='bg-[#EFEFEF] px-[60px] py-[40px]'>
                {cartItems.length === 0 ? (
                    <p>No items in cart.</p>
                ) : (<>
                    <div>
                        <div className='flex justify-between'>
                            <h2 className='text-[18px] font-medium'>PRODUCT</h2>
                            <h2 className='text-[18px] font-medium'>TOTAL</h2>
                        </div>
                        <div className='w-full h-[1px] bg-[#D8D8D8] mt-[18px] mb-[22px]'></div>
                        <ul className="divide-y divide-gray-200 mb-4">
                            {cartItems.map((item) => (
                                <li key={item._id} className="py-2 flex justify-between">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
                )}
                <div className='w-full h-[1px] bg-[#D8D8D8] mt-[10px] mb-[14px]'></div>

                <div className="mb-2 flex justify-between">
                    <span className='font-medium'>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='w-full h-[1px] bg-[#D8D8D8] mt-[10px] mb-[14px]'></div>
                <div className="mb-2 flex justify-between">
                    <span className='font-medium'>Shipping:</span>
                    <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className='w-full h-[1px] bg-[#D8D8D8] mt-[10px] mb-[14px]'></div>
                <div className="font-bold flex justify-between text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <div className="mt-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Payment Type</label>
                    <select
                        className="select select-bordered w-full"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    >
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>Cash on Delivery</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Order;
