import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    FilePlus,
    ClipboardList,
    Search,
    HandCoins,
    ShoppingBag
} from "lucide-react";
import Navbar from './Navbar';
import Loader from './Loader';



function UserReportedItems() {

    const userMenu = [
        { icon: <FilePlus />, label: "Report an Item", path: "/user/dashboard/report-item" },
        { icon: <ClipboardList />, label: "My Reported Items", path: "/user/dashboard/reported-items" },
        { icon: <Search />, label: "Search Items", path: "/user/dashboard/search" },
        { icon: <HandCoins />, label: "My Claims", path: "/user/dashboard/claims" },
        { icon: <ShoppingBag />, label: "Item Claims", path: `/user/dashboard/claims/view-claims` },


    ];

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportedItems = async () => {
            try {
                const response = await axios.get(`https://findx-zvqm.onrender.com/api/v1/items/reportedItems`);
                setItems(response.data.items);
            } catch (err) {

                setError('Failed to load your reported items');
            } finally {
                setLoading(false);
            }
        };

        fetchReportedItems();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex space-x-4">
            <div>
                <Navbar title="User DashBoard" menuItems={userMenu} />
            </div>
            <div className="w-full  rounded-md mt-7">
                <h1 className="text-2xl font-semibold mb-4 mx-8 mt-5 text-orange-500">Your Reported Items</h1>
                {items.length === 0 ? (
                    <p className="w-[75vw] p-6  text-orange-500 mt-44 mx-[25vw] justify-center items-center text-2xl">You haven't reported any items yet.</p>
                ) : (
                    <div className="mx-7 mt-4 flex gap-6 overflow-x-auto pb-4">
                        {items.map((item) => (
                            <div key={item._id} className="bg-white shadow-md rounded-lg w-80 border border-gray-400">
                                <img src={item.imageURL} alt={item.itemName} className="w-full h-48 object-cover rounded-t-md" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-orange-500 mb-2">{item.itemName}</h3>
                                    <p><strong>Type:</strong> {item.type}</p>
                                    <p><strong>Category:</strong> {item.category}</p>
                                    <p><strong>Status:</strong> {item.status}</p>
                                    <p><strong>Location:</strong> {item.location}</p>
                                    <p><strong>Date Reported:</strong> {item.date}</p>
                                    {item.securityQuestion && (
                                        <p><strong>Security Question:</strong> {item.securityQuestion}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserReportedItems;
