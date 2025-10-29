import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FilePlus, ClipboardList, Search, HandCoins, ShoppingBag } from "lucide-react";
import Navbar from './Navbar';
import Loader from './Loader';

function UserClaims() {
    const userMenu = [
        { icon: <FilePlus />, label: "Report an Item", path: "/user/dashboard/report-item" },
        { icon: <ClipboardList />, label: "My Reported Item", path: "/user/dashboard/reported-items" },
        { icon: <Search />, label: "Search Items", path: "/user/dashboard/search" },
        { icon: <HandCoins />, label: "My Claims", path: "/user/dashboard/claims" },
        { icon: <ShoppingBag />, label: "Item Claims", path: "/user/dashboard/claims/view-claims" },
    ];

    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await axios.get(`https://findx-zvqm.onrender.com/api/v1/claims/user-claims`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },

                },
                    { withCredentials: true });
                setClaims(response.data.data || []);
            } catch (err) {
                setError('Failed to fetch claims');

            } finally {
                setLoading(false);
            }
        };

        fetchClaims();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

    return (
        <div className='flex space-x-4'>
            <div>
                <Navbar title="User DashBoard" menuItems={userMenu} />
            </div>
            <div className="max-w-5xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">Your Reported Claims</h1>
                {claims.length === 0 ? (
                    <p className="text-center text-orange-500">No claims reported yet.</p>
                ) : (
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full table-auto border border-gray-200 rounded-md">
                            <thead className="bg-orange-400 text-white text-left">
                                <tr>
                                    <th className="px-4 py-3 border-b">Item Name</th>
                                    <th className="px-4 py-3 border-b">Location</th>
                                    <th className="px-4 py-3 border-b">Status</th>
                                    <th className="px-4 py-3 border-b">Claim Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claims.map((claim) => (
                                    <tr key={claim._id} className="hover:bg-gray-50 text-gray-700">
                                        <td className="px-4 py-3 border-b">
                                            {claim.itemId?.itemName || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            {claim.itemId?.location || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${claim.status === 'approved'
                                                    ? 'bg-green-100 text-green-700'
                                                    : claim.status === 'rejected'
                                                        ? 'bg-red-100 text-red-600'
                                                        : 'bg-yellow-100 text-yellow-600'
                                                    }`}
                                            >
                                                {claim.status?.toUpperCase() || 'PENDING'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 border-b">
                                            {claim.createdAt ? new Date(claim.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserClaims;