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
const ManageClaims = () => {
  const userMenu = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Users />, label: "Manage Users", path: "/admin/dashboard/manage-users" },
    { icon: <PackageSearch />, label: "Manage Items", path: "/admin/dashboard/manage-items" },
    { icon: <Handshake />, label: "Manage Claims", path: "/admin/dashboard/manage-claims" },
  ];

  const [claims, setClaims] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get('/api/v1/claims/All-claims', {
          withCredentials: true,
        });
       

        const flatClaims = res.data.data.flatMap((item) =>
          item.claims.map((claim) => ({
            ...claim,
            itemName: item.itemName, 
            category: item.category,
            securityQuestion: item.securityQuestion
          }))
        );

        setClaims(flatClaims);
      } catch (error) {
        toast.error('Failed to fetch claims', error);
      }
    };

    fetchClaims();
  }, []);

  const handleStatusUpdate = async (claimId, newStatus) => {
    try {
      await axios.patch(
        `/api/v1/claims/${claimId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim._id === claimId ? { ...claim, status: newStatus } : claim
        )
      );
      setMessage(`Claim ${newStatus} successfully.`);
      
   
      toast.success(`Claim ${newStatus} successfully!`, {
        position: "bottom-right",
        autoClose: 3000, 
      });

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
     
      toast.error('Failed to update claim status!', {
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
      <div className="p-6 mt-5">
        <h1 className="text-2xl font-bold mb-4 text-orange-500 -mx-14">Manage Claims</h1>
      
        {claims.length === 0 ? (
          <p className=' px-96 py-60 text-orange-500'>No claims found.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow -mx-14">
            <thead>
              <tr className='text-white bg-orange-500'>
                <th className="px-4 py-2">Claimant Name</th>
                <th className="px-4 py-2">Item Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Security Question</th>
                <th className="px-4 py-2">Answer Given</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id}>
                  <td className="border px-4 py-2">{claim.claimantId?.name || 'Unknown'}</td>
                  <td className="border px-4 py-2">{claim.itemName}</td>
                  <td className="border px-4 py-2">{claim.category}</td>
                  <td className="border px-4 py-2">{claim.securityQuestion || 'Not available'}</td>
                  <td className="border px-4 py-2">{claim.answerGiven || 'No answer'}</td>
                  <td className="border px-4 py-2">{claim.status}</td>
                  <td className="border px-4 py-2">
                    {claim.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(claim._id, 'approved')}
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(claim._id, 'rejected')}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>No actions available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      
      <ToastContainer />
    </div>
  );
};

export default ManageClaims;
