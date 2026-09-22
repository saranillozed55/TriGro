import { useState} from "react";
import AddItemMenu from "./AddItemMenu";
import { useInventory } from "./InventoryContext";

export default function MyInvetoryDash() {

    const[showItemMenu, setShowItemMenu] = useState(false);

    const{inventory, handleGetAllInventory} = useInventory();

  //TODO: Implement remove item
  return (
    <>
      {showItemMenu && (<AddItemMenu onItemAdded={handleGetAllInventory} onClosePerformed={() => setShowItemMenu(false)}/>)}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-lg font-semibold mb-4">My Inventory</h2>
        <div className="space-y-3">
          {inventory.map((item) => (
            <div key={item.id} className="flex items-end">
              <span className="flex items-center gap-2">
                <span>{item.name}</span>
              </span>
              <span className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1"></span>
              <span className="font-medium">{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
      <div className ="flex flex-horizontal gap-4 ">
        <div className = "bg-gray-300 w-fit rounded p-2">
            <button className = "cursor-pointer" onClick={() => setShowItemMenu(true)}>+ Add Item</button>
        </div>
        <div className ="bg-gray-300 w-fit rounded p-2">
            <button className = "cursor-pointer">+ Remove Item</button> 
        </div>
      </div>
    </>
  );
}