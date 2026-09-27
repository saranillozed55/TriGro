import {useState} from "react"
import { useInventory } from "../components/InventoryContext"
import AddItemMenu from "../components/AddItemMenu"
import RemoveItemMenu from "../components/RemoveItemMenu"


export default function Stock() {
  const[search, setSearch] = useState('')
  const[showRemoveItemMenu, setShowRemoveItemMenu] = useState(false);


  const handleSearchChange = (newSearch) => {
    setSearch(newSearch.target.value)
  }

  
  const[showItemMenu, setShowItemMenu] = useState(false);
  const {inventory, handleGetAllInventory} = useInventory();

  //TODO: Make cards for this page instead of plain text
  return( 
    <>
      {showRemoveItemMenu && (<RemoveItemMenu onItemRemoved={handleGetAllInventory} onClosePerformed={() => setShowRemoveItemMenu(false)}/>)}
      {showItemMenu && (<AddItemMenu onItemAdded={handleGetAllInventory} onClosePerformed={() => setShowItemMenu(false)}/>)}
      <div className ="flex flex-col gap-3 ">
        <h2 className="text-2xl font-semibold text-gray-900">Stock</h2>
        <div className ="border-gray-800 px-2 py-2 shadow-sm rounded">
          <input className="w-100" type="text" placeholder="Search your inventory..." 
          onChange={handleSearchChange} maxLength="50"></input>
        </div>
        <div className ="flex flex-horizontal gap-2">
          <div className = "bg-gray-300 w-fit rounded p-2">
                <button className = "cursor-pointer" onClick={() => setShowItemMenu(true)}>+ Add Item</button> 
          </div>
          <div className = "bg-gray-300 w-fit rounded p-2">
                <button className = "cursor-pointer" onClick={() => setShowRemoveItemMenu(true)}>- Remove Item</button> 
          </div>
        </div>
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
    </>
);
}