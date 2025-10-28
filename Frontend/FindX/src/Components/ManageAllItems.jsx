import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import {
  LayoutDashboard,
  Users,
  PackageSearch,
  Handshake,

} from 'lucide-react';
import Loader from './Loader';

const ManageAllItems = () => {
  const userMenu = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Users />, label: "Manage Users", path: "/admin/dashboard/manage-users" },
    { icon: <PackageSearch />, label: "Manage Items", path: "/admin/dashboard/manage-items" },
    { icon: <Handshake />, label: "Manage Claims", path: "/admin/dashboard/manage-claims" },

  ];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {

      const res = await axios.get(`https://findx-zvqm.onrender.com/items/getAllItems`, { withCredentials: true });
      setItems(res.data.data);
    } catch (error) {

      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`https://findx-zvqm.onrender.com/api/v1/items/delete-item/${itemId}`, { withCredentials: true });
      toast.success('Item deleted successfully');
      fetchItems();
    } catch (error) {

      toast.error('Failed to delete item');
    }
  };

  const handleStatusUpdate = async (itemId, newStatus) => {
    try {
      await axios.put(
        `https://findx-zvqm.onrender.com/api/v1/items/update-item-status/${itemId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success('Item status updated successfully');
      fetchItems();
    } catch (error) {

      toast.error('Failed to update item status');
    }
  };

  if (loading) return (<Loader />)
  return (
    <div className='flex -space-x-2'>
      <div className="w-1/4">
        <Navbar title="Admin DashBoard" menuItems={userMenu} />
      </div>
      <div className="p-6 w-3/4 relative mt-2">
        <h1 className="text-2xl font-bold mb-4 -mx-12 text-orange-500">Manage Items</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : items.length > 0 ? (
          <table className="min-w-full bg-white rounded shadow -mx-16 border border-gray-200">
            <thead>
              <tr className="border-b bg-orange-400 text-white">
                <th className="px-4 py-2 border border-gray-200">Item Name</th>
                <th className="px-4 py-2 border border-gray-200">Type</th>
                <th className="px-4 py-2 border border-gray-200">Category</th>
                <th className="px-4 py-2 border border-gray-200">Status</th>
                <th className="px-4 py-2 border border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="px-4 py-2 border border-gray-200">{item.itemName}</td>
                  <td className="px-4 py-2 border border-gray-200">{item.type}</td>
                  <td className="px-4 py-2 border border-gray-200">{item.category}</td>
                  <td className="px-4 py-2 border border-gray-200">{item.status}</td>
                  <td className="px-4 py-2 border border-gray-200">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(item._id, 'claimed')}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 transition"
                    >
                      Mark as Claimed
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(item._id, 'archived')}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition"
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className=" text-orange-500 py-64 text-center">No items found</p>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default ManageAllItems;