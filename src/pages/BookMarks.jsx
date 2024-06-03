/* eslint-disable no-unused-vars */
import React from 'react'

import { MdCurrencyRupee } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";


import { useSelector, useDispatch } from 'react-redux'
import { removeFromBookMark } from '../store/cartSlice';

const BookMarks = () => {

    const { bookMarks } = useSelector(store => store.cart);
    const dispatch = useDispatch();

    return (
        <div className='content-list  flex items-center max-w-[700px] gap-4 mt-5 m-auto'>
            {bookMarks.length > 0 ? bookMarks.map((content, index) => {
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
                            <button onClick={() => dispatch(removeFromBookMark(content._id))} className='btn border p-2 text-xs rounded-md'>Remove</button>
                        </div>
                    </div>
                )
            }) : <div className='text-center w-full mt-60 text-4xl drop-shadow-md'>Nothing To Show ! 😒</div>}
        </div>
    )
}

export default BookMarks