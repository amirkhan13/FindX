import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = ({ title = "Dashboard", menuItems = [] }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Loading...",
    avatar: "/default-avatar.png"
  });

  const handleLogout = async () => {
    try {
      const response = await axios.post(`https://findx-zvqm.onrender.com/api/v1/users/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`https://findx-zvqm.onrender.com/api/v1/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setUserData({
          name: res.data.data.username,
          avatar: res.data.data.avatar || "/default-avatar.png",
        });
      } catch (error) {

        setUserData(prev => ({
          ...prev,
          name: "Guest"
        }));
      }
    };

    fetchProfile();
  }, []);

  return (
    <aside className=" w-64 h-[91vh] bg-white text-orange-400 p-6 rounded-2xl shadow-xl flex flex-col justify-between mx-5 mt-8 border border-gray-500">
      <div>
        <div className="flex items-center mb-6 gap-3">
          <img
            src={userData.avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
            }}
          />
          <div className="text-sm font-semibold text-orange-400">Hello, {userData.name}</div>
        </div>

        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <nav className="space-y-3">
          {menuItems.map((item, index) => (
            <NavItem key={index} icon={item.icon} label={item.label} path={item.path} />
          ))}
        </nav>
      </div>

      <div>
        <NavItem icon={<LogOut size={20} />} label="Logout" onClick={handleLogout} />
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, path, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-400 hover:text-white transition"
    >
      {path ? (
        <Link to={path} className="flex items-center gap-3 w-full">
          {icon}
          <span>{label}</span>
        </Link>
      ) : (
        <>
          {icon}
          <span>{label}</span>
        </>
      )}
    </div>
  );
};

export default Navbar;