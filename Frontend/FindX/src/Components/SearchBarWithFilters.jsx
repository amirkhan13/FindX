import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FilePlus, ClipboardList, Search, HandCoins, ShoppingBag } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SearchBarWithFilters = () => {
  const userMenu = [
    { icon: <FilePlus />, label: "Report an Item", path: "/user/dashboard/report-item" },
    { icon: <ClipboardList />, label: "My Reported Item", path: "/user/dashboard/reported-items" },
    { icon: <Search />, label: "Search Items", path: "/user/dashboard/search" },
    { icon: <HandCoins />, label: "My Claims", path: "/user/dashboard/claims" },
    { icon: <ShoppingBag />, label: "Item Claims", path: `/user/dashboard/claims/view-claims` },
  ];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState([]);
  const [claimedItems, setClaimedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    params.append("type", "found");
    if (category) params.append("category", category);
    if (status) params.append("status", status);

    try {
      const res = await axios.get(`https://findx-zvqm.onrender.com/api/v1/items/getAllItems?${params}`, {
        withCredentials: true,
      });
      setResults(res.data.data);
    } catch (err) {

      toast.error("Failed to fetch search results.");
      setResults([]);
    }
  };

  const handleClaim = async (itemId) => {
    setSelectedItem(itemId);
    setShowModal(true);
    try {
      const res = await axios.get(`https://findx-zvqm.onrender.com/api/v1/items/${itemId}`, {
        withCredentials: true,
      });
      setSecurityQuestion(res.data.data.securityQuestion || "No question available");
    } catch (err) {

      toast.error("Failed to fetch security question.");
      setSecurityQuestion("Error fetching question");
    }
  };

  const handleClaimSubmit = async () => {
    try {
      const res = await axios.post(
        `https://findx-zvqm.onrender.com/api/v1/claims/${selectedItem}/create-claim`,
        { answerGiven: answer },
        { withCredentials: true }
      );
      toast.success("Item successfully claimed!");
      setClaimedItems((prev) => [...prev, selectedItem]);
      setShowModal(false);
      setAnswer("");
      navigate("/user/dashboard/claims");
    } catch (err) {

      toast.error(err.response?.data?.message || "You may have already claimed this item.");
    }
  };

  return (
    <div className='flex space-x-4'>
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
      <div>
        <Navbar title="User DashBoard" menuItems={userMenu} />
      </div>

      <div className="p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">🔍 Search Found Items</h2>

        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search found items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded w-48"
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Category</option>
            <option value="Phone">Phone</option>
            <option value="Bag">Bag</option>
            <option value="Wallet">Accessories</option>
            <option value="ID Card">ID Card</option>
          </select>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Status</option>
            <option value="open">Open</option>
            <option value="claimed">Claimed</option>
            <option value="archived">Archived</option>
          </select>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Search
          </button>
        </form>

        {hasSearched ? (
          results.length === 0 ? (
            <p className="text-orange-500">No found items match your search criteria.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.map((item) => (
                <div key={item._id} className="bg-white shadow-md rounded-lg p-4 border w-80 mx-auto">
                  {item.imageURL ? (
                    <img
                      src={item.imageURL}
                      alt={item.itemName}
                      className="w-full h-48 object-cover mb-3 rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-item.png";
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 mb-3 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}

                  <h3 className="text-lg font-semibold text-black mb-2">{item.itemName}</h3>

                  <div className="space-y-2 text-black">
                    <p className="text-sm"><strong>Description:</strong> {item.description || "Not provided"}</p>
                    <p className="text-sm"><strong>Category:</strong> {item.category}</p>
                    <p className="text-sm">
                      <strong>Status:</strong>{" "}
                      <span className={
                        item.status === "open" ? "text-green-600" :
                          item.status === "claimed" ? "text-red-600" : "text-gray-600"
                      }>
                        {item.status}
                      </span>
                    </p>
                    <p className="text-sm"><strong>Found Location:</strong> {item.location || "Not specified"}</p>
                    <p className="text-sm"><strong>Found Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "Unknown"}</p>
                  </div>

                  <button
                    onClick={() => handleClaim(item._id)}
                    className={`mt-4 w-full px-4 py-2 rounded text-white ${claimedItems.includes(item._id) || item.status !== "open"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-300"
                      }`}
                    disabled={claimedItems.includes(item._id) || item.status !== "open"}
                  >
                    {claimedItems.includes(item._id)
                      ? "Claimed"
                      : item.status !== "open"
                        ? "Not Available"
                        : "Claim Item"}
                  </button>
                </div>
              ))}
            </div>
          )
        ) : null}


        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-lg font-bold mb-2 text-black">Security Question</h2>
              <p className="text-black mb-4">{securityQuestion}</p>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full border px-3 py-2 rounded mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClaimSubmit}
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBarWithFilters;
