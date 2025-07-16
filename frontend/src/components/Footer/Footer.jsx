import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Footer = () => {
    const [email, setEmail] = useState('')
    const { mutate: subscribe, isPending, isError } = useMutation({
        mutationFn: async (data) => {
            try {
                const res = await axios.post('/api/user/newsletter', data);
                if (res.status === 201) {
                    return res.data;
                } else {
                    throw new Error('Something went wrong');
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    throw new Error(error.response.data.error || 'Bad Request');
                } else {
                    throw new Error('Something went wrong');
                }
            }
        },
        onSuccess: () => {
            setEmail('');
            toast.success('Subscribed to the newsletter');
        },
        onError: (error) => {
            toast.error(error.message);
            setEmail('');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            toast.error('Please enter an email address');
            return;
        }
        subscribe({ email });
    };
    return (
        <footer className='w-full pt-64 pb-20'>

            <div className='w-full border-t border-gray-200 mb-14'></div>

            <div className='flex flex-col '>
                <div className='flex  w-full justify-between'>
                    <ul className='flex max-w-lg  w-full justify-between'>
                        <li className='text-gray-500 textarea-md'>CONTACT</li>
                        <li className='text-gray-500 textarea-md'>TERMS OF SERVICES</li>
                        <li className='text-gray-500 textarea-md'>SHIPPING AND RETURNS</li>
                    </ul>
                    <form className='flex max-w-sm w-full border-b border-gray-500 pb-3'>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Give an email, get the newsletter." className='w-full border-none outline-none' id="" />
                        <button onClick={handleSubmit}><img src="/subscribe.svg" alt="" /></button>
                    </form>
                </div>
                <div></div>
                <div></div>
            </div>
        </footer>
    )
}

export default Footer