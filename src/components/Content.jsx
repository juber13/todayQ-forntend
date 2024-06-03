/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";


import { addToCart, addToBookMark, removeFromBookMark, addToData , setFilteredData } from '../store/cartSlice';
import { useSelector, useDispatch } from 'react-redux';


const Content = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const { cart, bookMarks , data } = useSelector(store => store.cart);

    const handleCart = (id, content) => {
        const isContentExits = cart.some(item => item._id === id);
        if (!isContentExits) dispatch(addToCart(content));
    }

    const handleBookMarks = (id, content) => {
        const isContentExits = bookMarks.some(item => item._id === id);
        if (!isContentExits) dispatch(addToBookMark(content));
        else dispatch(removeFromBookMark(id));
    }


    useEffect(() => {
        console.log('useEffect')
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch('https://todayq-backend-96id.onrender.com/api/content/contents');
                const data = await res.json();
                dispatch(addToData(data.contents));
                dispatch(setFilteredData(data.contents));
                setLoading(false);
            } catch (err) {
                console.log(err.message)
            }
        }

        fetchData();
        
    }, [])

    return (
        <div className='content-list pt-4 flex flex-wrap gap-5 '>
            {loading && <div className='flex items-center justify-center w-full h-screen'>Loading...</div>}
            {data && data.map((content, index) => {
                return (
                    <div className='content shadow-md flex flex-col justify-between border w-[200px] h-[200px] rounded-md p-3' key={index}>
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
                            <button onClick={() => handleCart(content._id, content)} className='btn border p-2 text-xs rounded-md'>
                                {cart?.some(item => item._id == content._id) ? "Added" : "Add To Cart"}
                            </button>

                            <CiBookmark onClick={() => handleBookMarks(content._id, content)} fill={`${bookMarks.some(item => item._id == content._id) ? "red" : ""}`} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Content
