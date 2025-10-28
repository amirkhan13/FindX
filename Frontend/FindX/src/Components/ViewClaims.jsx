import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FilePlus,
  ClipboardList,
  Search,
  HandCoins,
  ShoppingBag,
} from "lucide-react";
import Navbar from "./Navbar";


const ViewClaims = () => {
  const userMenu = [
    { icon: <FilePlus />, label: "Report an Item", path: "/user/dashboard/report-item" },
    { icon: <ClipboardList />, label: "My Reported Item", path: "/user/dashboard/reported-items" },
    { icon: <Search />, label: "Search Items", path: "/user/dashboard/search" },
    { icon: <HandCoins />, label: "My Claims", path: "/user/dashboard/claims" },
    { icon: <ShoppingBag />, label: "Item Claims", path: "/user/dashboard/claims/view-claims" },
  ];

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportedItems();
  }, []);

  const fetchReportedItems = async () => {
    try {
      setError("");
      const response = await axios.get(`${__API_URL__}/claims/Item-Claims`, {
        withCredentials: true,
      });
      setItems(response.data.data);
    } catch (err) {
      setError("Failed to fetch reported items. Please try again later.");

    }
  };

  const handleClaimAction = async (claimId, action) => {
    try {
      await axios.patch(
        `${__API_URL__}/claims/${claimId}/status`,
        { status: action },
        { withCredentials: true }
      );
      fetchReportedItems();
    } catch (err) {
      setError(`Failed to update claim status. Try again.`);

    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "#10b981";
      case "rejected":
        return "#ef4444";
      case "pending":
      default:
        return "#f59e0b";
    }
  };

  return (
    <div className="flex space-x-4">
      <div>
        <Navbar title="User DashBoard" menuItems={userMenu} />
      </div>
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#f97316", fontSize: "24px", marginBottom: "20px" }}>
          Your Reported Item's Claims
        </h2>

        {error && <p style={{ color: "#ef4444", marginBottom: "10px" }}>{error}</p>}

        {items.length === 0 && !error ? (
          <p className="px-80 text-orange-500 py-60">No reported items found.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {items.map((item) => (
              <div
                key={item._id}
                style={{
                  width: "100%",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  backgroundColor: "#fff",
                  padding: "16px",
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.itemName}
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  />
                )}
                <h3 style={{ color: "#f97316", marginBottom: "8px", textTransform: "lowercase" }}>
                  {item.itemName}
                </h3>
                <p><strong>Category:</strong> {item.category}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: getStatusColor(item.status), fontWeight: "bold" }}>
                    {item.status}
                  </span>
                </p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date Reported:</strong> {item.date?.slice(0, 10)}</p>
                {item.securityQuestion && (
                  <p><strong>Security Question:</strong> {item.securityQuestion}</p>
                )}

                {item.claims && item.claims.length > 0 ? (
                  <div style={{ marginTop: "12px" }}>
                    <h4 style={{ color: "#f97316", fontSize: "16px", marginBottom: "10px" }}>Claims</h4>
                    <div style={{ display: "flex", overflowX: "auto", gap: "12px" }}>
                      {item.claims.map((claim) => (
                        <div
                          key={claim._id}
                          style={{
                            minWidth: "250px",
                            flex: "0 0 auto",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            padding: "10px",
                            backgroundColor: "#f9fafb",
                          }}
                        >
                          <p><strong>Name:</strong> {claim.claimantId?.name || "N/A"}</p>
                          <p><strong>Email:</strong> {claim.claimantId?.email || "N/A"}</p>
                          <p><strong>Course:</strong> {claim.claimantId?.course || "N/A"}</p>
                          <p><strong>Year:</strong> {claim.claimantId?.Year || "N/A"}</p>
                          <p><strong>Answer:</strong> {claim.answerGiven}</p>
                          <p>
                            <strong>Status:</strong>{" "}
                            <span style={{ color: getStatusColor(claim.status), fontWeight: "bold" }}>
                              {claim.status}
                            </span>
                          </p>

                          {claim.status === "pending" && (
                            <div style={{ marginTop: "8px" }}>
                              <button
                                onClick={() => handleClaimAction(claim._id, "approved")}
                                style={{
                                  marginRight: "10px",
                                  padding: "6px 12px",
                                  backgroundColor: "#10b981",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleClaimAction(claim._id, "rejected")}
                                style={{
                                  padding: "6px 12px",
                                  backgroundColor: "#ef4444",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p style={
                    { marginTop: "10px ", color: "red" }
                  }>No claims for this item.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewClaims;
