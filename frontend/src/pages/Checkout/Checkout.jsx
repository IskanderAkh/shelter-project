import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import BillingDetails from '../../components/BillingDetails/BillingDetails'
import Order from '../../components/YourOrder/Order'
import { useCart } from '../../Context/CartContext'

const Checkout = () => {
    const [openPromo, setOpenPromo] = useState(false)
    const [promoCode, setPromoCode] = useState('')
    const { cart } = useCart()
    const [cartItems, setCartItems] = useState(cart || [])
    const [discount, setDiscount] = useState(0)

    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [shippingCost, setShippingCost] = useState(0)

    const { mutate: promo, isLoading } = useMutation({
        mutationKey: ['promo'],
        mutationFn: async (code) => {
            const res = await axios.get('/api/promocode/getOnePromo', {
                params: { code },
            })
            return res.data
        },
        onSuccess: (data) => {
            toast.success('Coupon code applied')
            setDiscount(parseInt(data.discount) || 0)
            localStorage.setItem('coupon', JSON.stringify(data))
        },
        onError: (err) => {
            toast.error('You entered the wrong coupon')
            console.error('Invalid promo code', err)
        },
    })

    const checkPromo = () => {
        promo(promoCode)
    }

    return (
        <div>
            <h1 className="text-center cart-title mb-16">Checkout</h1>
            <div>
                <h2 className="text-slate-500">
                    Have a coupon?{' '}
                    <span className="text-black cursor-pointer" onClick={() => setOpenPromo(!openPromo)}>
                        Click here to enter your code
                    </span>
                </h2>

                {openPromo && (
                    <div className="border border-slate-200 max-w-[580px] w-full pt-6 pb-10 px-6 mt-6 flex flex-col gap-10">
                        <h3 className="font-[16px] text-slate-500">
                            If you have a coupon code, please apply it below.
                        </h3>
                        <div className="flex justify-between">
                            <input
                                type="text"
                                className="border-b-[1px] border-b-slate-200 pb-4 outline-none w-full max-w-[336px]"
                                placeholder="Coupon Code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button
                                className="bg-black text-white py-4 px-6 rounded-[4px]"
                                onClick={checkPromo}
                                type="button"
                            >
                                APPLY COUPON
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row justify-between gap-10 mt-10">
                    <BillingDetails
                        country={country}
                        setCountry={setCountry}
                        city={city}
                        setCity={setCity}
                        shippingCost={shippingCost}
                        setShippingCost={setShippingCost}
                    />

                    <Order
                        cartItems={cartItems}
                        shippingCost={shippingCost}
                    />
                </div>
            </div>
        </div>
    )
}

export default Checkout
