import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaImages, FaYoutube, FaBookOpen, FaBolt, FaChartBar, FaStore, FaBars, FaChevronLeft, FaClosedCaptioning } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
const menuItems = [
  { label: 'Carousel', icon: <FaImages size={20} />, path: '/carousel' },
  { label: 'YouTube Links', icon: <FaYoutube size={20} />, path: '/youtube' },
  { label: 'Daily Word', icon: <FaBookOpen size={20} />, path: '/dailyword' },
  { label: 'Flash News', icon: <FaBolt size={20} />, path: '/flashnews' },
  { label: 'MSP Data', icon: <FaChartBar size={20} />, path: '/mspdata' },
  { label: 'Market Prices', icon: <FaStore size={20} />, path: '/marketprices' },
];

function SideNav() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <nav className={`h-screen relative bg-white shadow-lg flex flex-col py-8 border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-20 px-2' : 'w-64 px-4'}`}>
      <button
        className="absolute top-4 right-[16px] z-10 bg-indigo-600 text-white rounded-full p-2 shadow hover:bg-indigo-700 transition"
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? 'Expand' : 'Collapse'}
        style={{ outline: 'none' }}
      >
        {collapsed ? <IoMdClose size={18} /> : <FaBars size={18} />}
      </button>
      <div className={`mb-8 text-2xl font-bold text-indigo-700 text-center tracking-wide transition-all duration-300 ${collapsed ? 'text-lg' : ''}`}>{!collapsed && 'Dashboard'}</div>
      <ul className="flex-1 space-y-2">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition group ${
                  isActive || location.pathname === item.path
                    ? 'bg-indigo-100 text-indigo-700 font-bold shadow'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                }`
              }
              style={{ minWidth: 0 }}
            >
              <span className={`text-indigo-500 group-hover:text-indigo-700 transition ${collapsed ? 'mx-auto' : ''}`}>{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={`mt-8 text-xs text-gray-400 text-center transition-all duration-300 ${collapsed ? 'text-[10px]' : ''}`}>&copy; {new Date().getFullYear()} IIOR</div>
    </nav>
  );
}

export default SideNav;