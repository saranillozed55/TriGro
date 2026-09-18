import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import MyInventory from "../components/MyInventory";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Good afternoon!</h2>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your inventory.
        </p>
        {message && <p className="text-sm text-emerald-600 mt-1">{message}</p>}
      </div>

      <div className="flex gap-4">
        <StatCard label="Items" value="12" to="/stock" />
        <StatCard label="Low Stock" value="3" to="/stock" />
        <StatCard label="Top Stores" value="5" to="/stores" />
      </div>

      <MyInventory />
    </>
  );
}