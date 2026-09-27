import {useState, useEffect} from "react"
import { useInventory } from "../components/InventoryContext"
import AddItemMenu from "../components/AddItemMenu"
import RemoveItemMenu from "../components/RemoveItemMenu"


export default function Stock() {
  const {inventory, handleGetAllInventory} = useInventory();
  const[search, setSearch] = useState('')
  const[showRemoveItemMenu, setShowRemoveItemMenu] = useState(false);

  //creates acopy of inventory array
  const filteredData = [...inventory].sort((a,b) => {
    const searchTerm = search.toLowerCase();

    const aMatch = a.name.toLowerCase().includes(searchTerm);
    const bMatch = b.name.toLowerCase().includes(searchTerm);

    if(aMatch && !bMatch) return -1; // put a before b
    if(!aMatch && bMatch) return 1; // put b before a

    return 0;
  });

  const[showItemMenu, setShowItemMenu] = useState(false);

  //TODO: Make cards for this page instead of plain text
  return( 
    <>
      {showRemoveItemMenu && (<RemoveItemMenu onItemRemoved={handleGetAllInventory} onClosePerformed={() => setShowRemoveItemMenu(false)}/>)}
      {showItemMenu && (<AddItemMenu onItemAdded={handleGetAllInventory} onClosePerformed={() => setShowItemMenu(false)}/>)}
      <div className ="flex flex-col gap-3 py-3 ">
        <h2 className="text-3xl font-semibold text-gray-900">Stock</h2>
        <div className ="border-gray-800 px-2 py-2 shadow-sm rounded">
          <input className="w-100" type="text" placeholder="Search your inventory..." 
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
                <button className = "cursor-pointer">^ Update Item</button> 
          </div>
        </div>
        <div className="space-y-3">
          {filteredData.map((item) => (
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
    </>
);
}