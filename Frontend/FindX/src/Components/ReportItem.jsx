import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import { FilePlus, ClipboardList, Search, HandCoins, ShoppingBag } from "lucide-react";
import axios from 'axios';
import Loader from './Loader';

function ReportItem() {
    const today = new Date().toISOString().split('T')[0];

    const userMenu = [
        { icon: <FilePlus />, label: "Report an Item", path: "/user/dashboard/report-item" },
        { icon: <ClipboardList />, label: "My Reported Item", path: "/user/dashboard/reported-items" },
        { icon: <Search />, label: "Search Items", path: "/user/dashboard/search" },
        { icon: <HandCoins />, label: "My Claims", path: "/user/dashboard/claims" },
        { icon: <ShoppingBag />, label: "Item Claims", path: `/user/dashboard/claims/view-claims` },
    ];

    const [type, setType] = useState('lost');
    const [formData, setFormData] = useState({
        type: 'lost',
        itemName: '',
        category: '',
        description: '',
        location: '',
        imageURL: '',
        date: '',
        securityQuestion: ''
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === "imageURL") {
            setFormData({ ...formData, imageURL: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setType(newType);
        setFormData({ ...formData, type: newType });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const payload = new FormData();
        payload.append("type", formData.type);
        payload.append("itemName", formData.itemName);
        payload.append("category", formData.category);
        payload.append("date", formData.date);
        payload.append("imageURL", formData.imageURL);
        payload.append("location", formData.location);
        payload.append("securityQuestion", formData.securityQuestion);
        payload.append("description", formData.description);

        try {
            const res = await axios.post(`${__API_URL__}/items/report-item`, payload);

            setErrorMessage("");
            setSuccessMessage("Item Reported Successfully!");
            toast.success("Item Reported Successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);

            setFormData({
                type: 'lost',
                itemName: '',
                category: '',
                description: '',
                location: '',
                imageURL: '',
                date: '',
                securityQuestion: ''
            });
            setType('lost');
        } catch (error) {
            const status = error.response?.status;
            const message = error.response?.data?.message;
            if (status === 400 && message === "Image file is required") {
                setErrorMessage("Image is Required");
                toast.error("Image is Required");
            } else if (status === 400 && message === "Security question is required for the lost items") {
                setErrorMessage("Security question is required!");
                toast.error("Security question is required!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex space-x-4'>
            <div>
                <Navbar title="User DashBoard" menuItems={userMenu} />
            </div>

            <div className="w-[75vw] mx-auto p-6 bg-white rounded-xl shadow-xl text-black-500 mt-7 border border-gray-300">


                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="type" className="mb-2 font-semibold text-orange-400">Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    className="border p-2 rounded"
                                    value={formData.type}
                                    onChange={handleTypeChange}
                                >
                                    <option value="found">Found</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="itemName" className="mb-2 font-semibold text-orange-400">Item Name</label>
                                <input
                                    type="text"
                                    id="itemName"
                                    name="itemName"
                                    placeholder="e.g., Wallet"
                                    className="border p-2 rounded"
                                    value={formData.itemName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="category" className="mb-2 font-semibold text-orange-400">Category</label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    placeholder="e.g., Accessories"
                                    className="border p-2 rounded"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="description" className="mb-2 font-semibold text-orange-400">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="border p-2 rounded"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="location" className="mb-2 font-semibold text-orange-400">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="e.g., Cafeteria"
                                    className="border p-2 rounded"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="date" className="mb-2 font-semibold text-orange-400">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    max={today}
                                    className="border p-2 rounded"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="imageURL" className="mb-2 font-semibold text-orange-400">Image (Item)</label>
                                <input
                                    type="file"
                                    id="imageURL"
                                    name="imageURL"
                                    className="border p-2 rounded"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {type === 'found' && (
                                <div className="flex flex-col">
                                    <label htmlFor="securityQuestion" className="mb-2 font-semibold text-orange-400 ">Security Question</label>
                                    <input
                                        type="text"
                                        id="securityQuestion"
                                        name="securityQuestion"
                                        placeholder="Security question for verification"
                                        className="border p-2 rounded"
                                        value={formData.securityQuestion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="bg-orange-500 hover:bg-orange-300 text-white px-6 py-2 rounded">
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default ReportItem;
