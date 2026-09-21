import {useState} from "react"


export default function Stock() {
  const[search, setSearch] = useState('')

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch.target.value)
  }

  return( 
    <div className ="flex flex-col gap-3 ">
      <h2 className="text-2xl font-semibold text-gray-900">Stock</h2>
      <div className ="border-gray-800 px-2 py-2 shadow-sm rounded">
        <input className="w-100" type="text" placeholder="Search your inventory..." 
        onChange={handleSearchChange} maxLength="50"></input>
      </div>

      <div className = "bg-gray-300 w-fit rounded p-2">
            <button className = "cursor-pointer">+ Add Item</button>
      </div>

    </div>
);
}