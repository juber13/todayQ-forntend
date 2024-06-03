/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect , useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { addToData } from '../store/cartSlice';

const Sidebar = () => {
    const { data, filteredData } = useSelector(store => store.cart);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; // Mark as not initial mount after first render
        } else {
            let id = setTimeout(() => {
                const filtered = filteredData.filter(item => item.title.toLowerCase().includes(searchTerm));
                if (filtered.length > 0) {
                    dispatch(addToData(filtered));
                } else {
                    dispatch(addToData(data));
                }
            }, 300);

            return () => clearTimeout(id);
        }
    }, [searchTerm]);


    const handleSorting = (type) => {
        if (type === "increasing") {
            const sortedData = [...data].sort((a, b) => a.price - b.price);
            dispatch(addToData(sortedData));
            setFlag(true);
        } else if (type === "decreasing") {
            const sortedData = [...data].sort((a, b) => b.price - a.price);
            dispatch(addToData(sortedData));
            setFlag(false);
        } else {
            dispatch(addToData(filteredData));
            setFlag(null)
        }
    }

    return (
        <div className='bg-[#F8F9FA] shadow-xl border h-[92vh]'>
            <div className='p-2 mt-3'>
                <input ref={isInitialMount} onChange={(e) => setSearchTerm(e.target.value.toLowerCase().trim())}
                   value={searchTerm} type="text" placeholder='search...' className='p-1 rounded-md outline-none' />
            </div>



            <div className='flex justify-between  w-full mt-2 p-2'>
                <p className='text-orange-800 text-sm '>Increasig</p>
                <div onClick={() => handleSorting("increasing")} className={`radio-box border w-[20px] h-[20px] rounded-full cursor-pointer bg-${flag == true ? "blue-500" : "black"}`}></div>
            </div>

            <div className='flex justify-between w-full p-2'>
                <p className='text-orange-800 text-sm'>Decreasig</p>
                <div onClick={() => handleSorting("decreasing")} className={`radio-box border  w-[20px] h-[20px] rounded-full cursor-pointer bg-${flag == false ? "blue-500" : "black"}`}></div>
            </div>

            <div className='flex justify-between w-full p-2'>
                <button onClick={() => handleSorting("reset")} className={`w-full text-orange-800 border p-1 rounded-md shadow-md`}>Reset</button>
            </div>


            <div>
                <hr />
            </div>
        </div>
    )
}

export default Sidebar