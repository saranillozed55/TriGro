import {useState, useEffect} from "react"
import { useInventory } from "../components/InventoryContext"
import AddItemMenu from "../components/AddItemMenu"
import RemoveItemMenu from "../components/RemoveItemMenu"
import { RiSubtractFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoFilterOutline } from "react-icons/io5";

export default function Stock() {
  const {inventory, handleGetAllInventory} = useInventory();
  const[search, setSearch] = useState('')
  
  //creates acopy of inventory array
  const filteredData = [...inventory].sort((a,b) => {
    const searchTerm = search.toLowerCase();
    
    const aMatch = a.name.toLowerCase().includes(searchTerm);
    const bMatch = b.name.toLowerCase().includes(searchTerm);
    
    if(aMatch && !bMatch) return -1; // put a before b
    if(!aMatch && bMatch) return 1; // put b before a
    
    return a.id - b.id;
  });
  
  const[showRemoveItemMenu, setShowRemoveItemMenu] = useState(false);
  const[showItemMenu, setShowItemMenu] = useState(false);
  const[updateItems, setUpdateItems] = useState(false);

  const handleUpdateItems = () => {
    setUpdateItems(prev => !prev);
  }

  const handleItemValChange = async(event, itemName, itemQuantity) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/inventory/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: itemName, quantity: itemQuantity}), // here we want to increment the quantity instead of a specific value
            });
            
      if (!response.ok) {
      throw new Error("Failed to update item");
      }

      const data = await response.json;
      console.log(data.name, "was incremented to database.");

      await handleGetAllInventory();
    }
    catch(error) {
      console.error("Failed to add item:", error);
    }
  }


  //TODO: Make cards for this page instead of plain text
  return( 
    <>
      {showRemoveItemMenu && (<RemoveItemMenu onItemRemoved={handleGetAllInventory} onClosePerformed={() => setShowRemoveItemMenu(false)}/>)}
      {showItemMenu && (<AddItemMenu onItemAdded={handleGetAllInventory} onClosePerformed={() => setShowItemMenu(false)}/>)}
      <div className ="flex flex-col gap-3 py-3 ">
        <h2 className="text-3xl font-semibold text-gray-900">My Stock</h2>
        <div className ="border-gray-800 px-2 py-2 shadow-sm rounded">
          <input className="w-full px-4 py-3 text-gray-700 focus:outline-none" type="text" placeholder="Search your inventory..." 
          onChange={(e) => setSearch(e.target.value)} maxLength="50"></input>
        </div>

          <div className ="flex flex-horizontal gap-2">
            <div className = "bg-gray-300 w-fit rounded p-2">
                <button className = "cursor-pointer" onClick={() => setShowItemMenu(true)}>+ Add Item</button> 
            </div>
            <div className = "bg-gray-300 w-fit rounded p-2">
                <button className = "cursor-pointer" onClick={() => setShowRemoveItemMenu(true)}>- Remove Item</button> 
            </div>
            <div className = "bg-gray-300 w-fit rounded p-2">
                <button className = "cursor-pointer" onClick={handleUpdateItems}>^ Update Item</button> 
            </div>

            <button className="ml-auto cursor-pointer"><IoFilterOutline/></button>

        
        </div>
        <div className="space-y-3">
          {filteredData.map((item) => (
              <div key={item.id} className="flex items-end">
                <span className="flex items-center gap-2">
                  <span>{item.name}</span>
                </span>
                <span className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1"></span>
                <div className="flex flex-row gap-1">
                  <span className="font-medium">{item.quantity}</span>
                  {updateItems && (<button className="text-xl text-green-600 cursor-pointer" onClick={(e) =>
                    handleItemValChange(e, item.name, -1)
                  }><GoPlus/></button>)}
                  {updateItems && (<button className="text-xl text-red-600 cursor-pointer"
                  onClick={(e) => handleItemValChange(e,item.name,1)}
                  ><RiSubtractFill/></button>)}
                </div>
              </div>
            ))}
        </div>

      </div>
    </>
);
}