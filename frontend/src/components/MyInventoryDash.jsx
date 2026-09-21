import { useState } from "react";


export default function MyInvetoryDash() {

    const[inventory, setInventory] = useState([]);

    const items = [
    { name: "Eggs", emoji: "🥚", qty: 12 },
    { name: "Milk", emoji: "🥛", qty: 2 },
    { name: "Apples", emoji: "🍎", qty: 8 },
    ];

    //used for rendering the inventory on load
    const handleGetAllInventory = async () => {
      try {
        const response = await fetch("http://localhost:8000/inventory/", {method: "GET"});

        const data = await response.json();
        
        setInventory(data.array);
        // iterate through the data then place them into inventory
      }
      catch(error) {
        console.error("Error fetching inventory:", error)
      }
    }
    
    //used for re-rendering the inventory after just adding one or a few items and should NOT be "POST" should be get
    const handleGetInventoryItem = async () => {
      try {
        const response = await fetch("http://localhost:8000/inventory/", {method: "POST"});

        const newItem = await response.json();
        
        //atkes the old items and appens the single new item at the end
        setInventory(prevInventory => [...prevInventory, newItem])
      }
      catch(error) {
        console.error("Error fetching latest item:", error)
      }
    }

  //TODO: Must implement the adding item then MyInventory will display that in here by re-rendering
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-semibold mb-4">My Inventory</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.name} className="flex items-end">
            <span className="flex items-center gap-2">
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </span>
            <span className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1"></span>
            <span className="font-medium">{item.qty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}