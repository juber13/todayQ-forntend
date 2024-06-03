/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PiSpinnerGap } from 'react-icons/pi';
import { Toaster, toast } from 'react-hot-toast';
import { useSelector , useDispatch } from 'react-redux';
import { resetCart } from '../store/cartSlice';

import {useNavigate} from 'react-router-dom'

const Payment = () => {
    const [formData, setFormData] = useState({ name: '', cardNumber: '', cvv: '', expiry_date: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {cart} = useSelector(store => store.cart);
    const totalPrice = cart.reduce((acc, curr) => acc + Number(curr.price), 0);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    function generateTransactionID() {
        // Generate a random string
        let transactionID = Math.random().toString(36).substring(2, 12);
    
        transactionID += "-" + Date.now();
        return transactionID;
      }
      


    const makePayment = async () => {
        let transactionId = generateTransactionID();
        try {
            setLoading(true);
            const res = await fetch('https://todayq-backend-96id.onrender.com/api/payment/saveDetail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...formData , totalPrice , transactionId}),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                toast.error('Error');
            } else {
                // Handle successful upload
                setFormData({ name: '', cardNumber: '', cvv: '', expiry_date: '' });
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again later.');
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        for (const field in formData) {
            if (!formData[field].trim()) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            // All fields have a value, proceed with form submission
            makePayment();
            toast.success("Payment successfull");
            setTimeout(() => {
                   navigate('/');
                   dispatch(resetCart([]));
            },2000)
        } else {
            // Display an error message
            setError('Please fill in all the required fields.');
            toast.error('Please fill  all the required fields.');
        }

    };

    return (
        <>
            <Toaster toastOptions={{ className: 'w-94 text-xs p-2 border border-red-400' }} />
            <div className="w-full h-[80vh] flex flex-col items-center justify-center mt-6">
                <div className="heading ">
                    <h2 className="text-xl text-blue-500">Make Payment</h2>
                </div>
                <div className="container  border p-6 w-[400px] h-auto rounded-sm shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="input mt-3">
                            <label htmlFor="title" className="block">
                                Holder Name
                            </label>
                            <input
                                onChange={handleChange}
                                name="name"
                                type="text"
                                placeholder="Card Holder Name"
                                className="p-2 rounded-md w-full required: outline-none border"
                                value={formData.title}
                            />
                        </div>

                        <div className="input mt-3">
                            <label htmlFor="description" className="block">
                                Card Number
                            </label>
                            <   input type='text'
                                onChange={handleChange}
                                name="cardNumber"
                                cols="40"
                                rows="4"
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                                className="p-2 rounded-md w-full required: outline-none resize-none border"
                                value={formData.description}
                            />
                        </div>

                        <div className="input mt-3">
                            <label htmlFor="imageUrl" className="block">
                                CVV
                            </label>
                            <input
                                onChange={handleChange}
                                name="cvv"
                                type="text"
                                placeholder="CVV"
                                className="p-2 rounded-md w-full required: outline-none border"
                                value={formData.imageUrl}

                            />
                        </div>

                        <div className="input mt-3">
                            <label htmlFor="price" className="block">
                                Expire Date
                            </label>
                            <input
                                onChange={handleChange}
                                name="expiry_date"
                                type="date"
                                placeholder="Expary Date"
                                className="p-2 rounded-md w-full required: outline-none border"
                                value={formData.price}

                            />
                        </div>


                        <div className="mt-3 flex items-center justify-between">
                            <button
                                type="submit"
                                className="flex gap-2 items-center border bg-green-400 font-semibold text-white p-2 text-sm rounded-md"
                            >
                                Pay {loading && <PiSpinnerGap className="animate-spin" />}
                            </button>

                            <h4 className='border px-3 p-2 rounded-md font-bold text-blue-800'>Total : {totalPrice}</h4>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Payment;
