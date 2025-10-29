import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import {
  LayoutDashboard,
  Users,
  PackageSearch,
  Handshake,
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageAllUsers = () => {
  const userMenu = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Users />, label: "Manage Users", path: "/admin/dashboard/manage-users" },
    { icon: <PackageSearch />, label: "Manage Items", path: "/admin/dashboard/manage-items" },
    { icon: <Handshake />, label: "Manage Claims", path: "/admin/dashboard/manage-claims" },
  ];

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`https://findx-zvqm.onrender.com/api/v1/admin/all-users`, { withCredentials: true });
      setUsers(res.data.data.users);
    } catch (error) {
      toast.error('Failed to fetch users', error);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://findx-zvqm.onrender.com/api/v1/admin/delete-users/${userId}`, { withCredentials: true });
      setUsers(users.filter(user => user._id !== userId));


      toast.success('User deleted successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {


      toast.error('Failed to delete user!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='flex space-x-4'>
      <div className="w-1/4">
        <Navbar title="Admin DashBoard" menuItems={userMenu} />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-orange-500 mt-6">Manage Users</h1>
        <table className="min-w-full rounded shadow">
          <thead className=' text-white bg-orange-400'>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.course}</td>
                <td className="border px-4 py-2">{user.Year}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageAllUsers;
