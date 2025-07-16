import React, { useState } from 'react';
import './modal.scss';

const CheckoutModal = ({ isOpen, onClose, onSubmit }) => {
    const [personName, setPersonName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [deliveryOption, setDeliveryOption] = useState('Standard');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [contactNum, setContactNum] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!personName || !cardNumber || !expiry || !cvv || !deliveryAddress || !contactNum) {
            alert('Please fill in all the fields');
            return;
        }

        onSubmit({
            cardDetails: { personName, cardNumber, expiry, cvv },
            deliveryOption,
            deliveryAddress,
            contactNum,
        });
        onClose(); // Close the modal after submission
    };

    return (
        <div className='modal-overlay w-full'>
            <div className='modal-content w-full'>
                <h2>Checkout</h2>
                <div className='modal-body w-full'>
                    <div className='card '>
                        <p className='h8 py-3'>Payment Details</p>
                        <div className='row gx-3'>
                            <div className='col-12'>
                                <div className='d-flex flex-column'>
                                    <p className='text mb-1'>Person Name</p>
                                    <input
                                        className='form-control mb-3'
                                        type='text'
                                        placeholder='Name'
                                        value={personName}
                                        onChange={(e) => setPersonName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='d-flex flex-column'>
                                    <p className='text mb-1'>Card Number</p>
                                    <input
                                        className='form-control mb-3'
                                        type='text'
                                        placeholder='1234 5678 4356 7890'
                                        value={cardNumber}
                                        maxLength={16}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='d-flex flex-column'>
                                    <p className='text mb-1'>Expiry</p>
                                    <input
                                        className='form-control mb-3'
                                        type='text'
                                        placeholder='MM/YYYY'
                                        maxLength={4}
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='d-flex flex-column'>
                                    <p className='text mb-1'>CVV/CVC</p>
                                    <input
                                        className='form-control mb-3 pt-2'
                                        type='password'
                                        placeholder='***'
                                        value={cvv}
                                        maxLength={3}
                                        onChange={(e) => setCvv(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label>
                            Delivery Option:
                            <select
                                value={deliveryOption}
                                className='select select-bordered w-full '
                                onChange={(e) => setDeliveryOption(e.target.value)}
                            >
                                <option value='Standard' selected>Standard</option>
                                <option value='Express'>Express</option>
                            </select>
                        </label>
                        <label className=''>
                            Delivery Address:
                            <input
                                type='text'
                                className='input input-bordered'
                                placeholder='Enter your address'
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                            />
                        </label>
                        <label>
                            Contact Number:
                            <input
                                type='text input input-bordered'
                                className='input input-bordered'
                                placeholder='Enter your contact number'
                                value={contactNum}
                                onChange={(e) => setContactNum(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className='modal-footer w-full flex gap-5'>
                    <button onClick={handleSubmit} className='btn-order mb-3 w-full rounded-md'>
                        <span className='ps-3'>Submit</span>
                    </button>
                    <button onClick={onClose} className='btn btn-secondary'>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
