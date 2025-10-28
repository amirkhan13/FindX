import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import {
  LayoutDashboard,
  Users,
  PackageSearch,
  Handshake,
  FileText
} from 'lucide-react';
import axios from "axios";



function AdminDashBoard() {
  const userMenu = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Users />, label: "Manage Users", path: "/admin/dashboard/manage-users" },
    { icon: <PackageSearch />, label: "Manage Items", path: "/admin/dashboard/manage-items" },
    { icon: <Handshake />, label: "Manage Claims", path: "/admin/dashboard/manage-claims" },

  ];
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalClaims: 0,
    pendingClaims: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${__API_URL__}/admin/get-stats`, { withCredentials: true });
        setStats(res.data.data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='flex space-x-4'>


      <div className="w-1/4">
        <Navbar title="Admin DashBoard" menuItems={userMenu} />
      </div>

      <div className="w-2/4 p-6 mt-7">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-6 ">
          <div className="bg-white p-6 rounded shadow-lg border border-gray-400">
            <h2 className="text-lg font-semibold  text-orange-500">Total Users</h2>
            <p className="text-2xl mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg border border-gray-400">
            <h2 className="text-lg font-semibold  text-orange-500">Total Items</h2>
            <p className="text-2xl mt-2">{stats.totalItems}</p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg border border-gray-400">
            <h2 className="text-lg font-semibold  text-orange-500">Total Claims</h2>
            <p className="text-2xl mt-2">{stats.totalClaims}</p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg border border-gray-400">
            <h2 className="text-lg font-semibold  text-orange-500">Pending Claims</h2>
            <p className="text-2xl mt-2">{stats.pendingClaims}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminDashBoard
