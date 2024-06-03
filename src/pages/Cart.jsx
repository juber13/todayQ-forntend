/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { removeToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';


const Cart = () => {
    const { cart } = useSelector(store => store.cart);
    console.log(cart)
    const dispatch = useDispatch();
    const totalPrice = cart.reduce((acc, curr) => acc + Number(curr.price), 0);
    return (
        <div className='container flex gap-5 justify-evenly max-w-3xl m-auto'>
            <div className='content-list pt-4 px-3 flex flex-wrap gap-5 flex-grow max-w-[700px]'>
                {cart.length > 0 ? cart.map((content, index) => {
                    return (
                        <div key={index} className='content shadow-md flex flex-col justify-between border w-[200px] h-[200px] rounded-md p-3' >
                            <div>
                                <h1 className='text-sm text-orange-600 mb-3'>{content.title.toUpperCase()}</h1>
                                <p className='text-sm mb-3'>{content.description}</p>
                                <p className='text-sm flex items-center'><MdCurrencyRupee />{content.price}</p>
                                <a href='#' className='text-xs text-blue-500'>{content.imageUrl}</a>
                            </div>
                            <div>
                                <hr />
                            </div>
                            <div className='flex items-center  justify-between'>
                                <button onClick={() => dispatch(removeToCart(content._id))} className='btn border p-2 text-xs rounded-md'>Remove</button>
                            </div>
                        </div>
                    )
                }) : <div className='text-center w-full mt-60 text-4xl drop-shadow-md'>Empty Cart!</div>}
            </div>

            {/* ======== subtotal */}

            {cart.length > 0 &&
                <div className="subtotal pt-4 text-center max-h-2xl">
                    <table className='w-full h-full border text-xs mt-2'>
                        <thead>
                            <tr className='border'>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Id</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cart.map(item => {
                                return (
                                    <>
                                        <tr className='border p-1 m-3'>
                                            <td className='border p-1'>{item.title}</td>
                                            <td className='border p-1'>{item.price}</td>
                                            <td className='border p-1'>{item._id}</td>
                                        </tr>
                                    </>
                                )
                            })}

                            <tr>
                                <td className='border font-bold px-3'>SubTotal</td>
                                <td className='text-center w-full text-md font-bold'>{totalPrice}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <Link to="/payment">
                        <button className='border p-2 w-full rounded-md bg-green-600 text-white mt-2'>Checkout</button>
                    </Link>
                </div>
            }
        </div>

    )
}

export default Cart