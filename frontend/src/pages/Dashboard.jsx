import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import MyInventoryDash from "../components/MyInventoryDash";
import { useInventory } from "../components/InventoryContext";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const {inventory, handleGetAllInventory} = useInventory();

  useEffect(() => {
    fetch("http://localhost:8000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    handleGetAllInventory();
  }, []);

 return (
    <>
      <div >
        <h2 className="text-2xl font-semibold text-gray-900">Good afternoon!</h2>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your inventory.
        </p>
      </div>

      <div className="flex gap-4">
        <StatCard label="Items" value={inventory.length} to="/stock" />
        <StatCard label="Low Stock" value="3" to="/stock" />
        <StatCard label="Top Stores" value="5" to="/stores" />
      </div>
      <div className="flex flex-col gap-4">
        <MyInventoryDash />
      </div>
    </>
  );
}