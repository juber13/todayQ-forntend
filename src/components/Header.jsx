/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";

import { useSelector } from 'react-redux';


const Header = () => {

    const { cart } = useSelector(store => store.cart);

    return (
        <div className='p-3 flex justify-between shadow-md'>
            <Link to="/"><div className="logo font-semibold text-orange-800">TODAYQ</div></Link>
            <div className="logo font-semibold flex gap-3 items-center">
                <Link to="/bookmarks">
                    <button className='add-content border p-2 text-xs rounded-md text-orange-800 '>BookMarks</button>
                </Link>

                <Link to="/upload"><button className='add-content border p-2 text-xs rounded-md text-orange-800 '>Upload Content</button>
                </Link>

                <Link to="/cart">
                    <button className='relative cart flex items-center  p-2 text-md  border rounded-md text-orange-800'> <CiShoppingCart />
                    </button>

                    {cart.length > 0 &&
                        <span className=' flex item-center justify-center absolute top-1 right-[0.4%] w-[20px] h-[20px] text-sm  rounded-full bg-gray-200'>{cart.length}</span>
                    }
                </Link>
            </div>
        </div>
    )
}

export default Header