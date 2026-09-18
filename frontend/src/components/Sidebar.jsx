import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BiSolidFridge } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { FaStore } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { label: "Dashboard", icon: RxDashboard, path: "/" },
    { label: "Stock", icon: BiSolidFridge, path: "/stock" },
    { label: "Stores", icon: FaStore, path: "/stores" },
    { label: "Settings", icon: IoSettings, path: "/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-emerald-400">TriGrow</h1>
      </div>

      <nav className="flex flex-col mt-4 gap-1 px-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.label}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="text-lg" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}