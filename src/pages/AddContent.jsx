/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PiSpinnerGap } from 'react-icons/pi';
import { Toaster, toast } from 'react-hot-toast';

const AddContent = () => {
    const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '', price: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };



    const uploadContent = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/content/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
                toast.error('Error');
            } else {
                // Handle successful upload
                toast.success('Uploded');
                setFormData({ title: '', description: '', imageUrl: '', price: '' });
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
            uploadContent();
            console.log("asdfa");
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
                    <h2 className="text-xl">Add Content</h2>
                </div>
                <div className="container  border p-6 w-[400px] h-auto rounded-sm shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="input mt-3">
                            <label htmlFor="title" className="block">
                                Title
                            </label>
                            <input
                                onChange={handleChange}
                                name="title"
                                type="text"
                                placeholder="title"
                                className="p-2 rounded-md w-full required: outline-none border"
                                value={formData.title}
                                

                            />
                        </div>

                        <div className="input mt-3">
                            <label htmlFor="description" className="block">
                                Description
                            </label>
                            <textarea
                                onChange={handleChange}
                                name="description"
                                cols="40"
                                rows="4"
                                placeholder="Description"
                                className="p-2 rounded-md w-full required: outline-none resize-none border"
                                value={formData.description}
                            ></textarea>
                        </div>

                        <div className="input mt-3">
                            <label htmlFor="imageUrl" className="block">
                                Image URL
                            </label>
                            <input
                                onChange={handleChange}
                                name="imageUrl"
                                type="text"
                                placeholder="Image URL"
                                className="p-2 rounded-md w-full required: outline-none border"
                                value={formData.imageUrl}

                            />
                        </div>

                        <div className="input mt-3">
                            <label htmlFor="price" className="block">
                                Price
                            </label>
                            <input
                                onChange={handleChange}
                                name="price"
                                type="text"
                                placeholder="Price"
                                className="p-2 rounded-md w-full required: outline-none border"
                                value={formData.price}
                                
                            />
                        </div>
                        

                        <div className="mt-3">
                            <button
                                type="submit"
                                className="flex gap-2 items-center border bg-green-400 font-semibold text-white p-2 text-sm rounded-md"
                            >
                                Upload {loading && <PiSpinnerGap className="animate-spin" />}
                            </button>

                            {/* {error && <div className="text-red-500">{error}</div>} */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddContent;
