import { useState } from "react";


export default function RemoveItemMenu({onItemRemoved, onClosePerformed}) {
   const[itemName, setItemName] = useState(''); 
   const[itemQuantity, setItemQuantity] = useState(1);
   const isInputEmpty = itemName.trim() === '';


    //TODO: The goal is to have rather have '-' buttons that pop up on whenever we want to remove an item rather than this menu but will keep this for now
   const handleItemRemoveSubmit = async (event) => {
        event.preventDefault();

        try { // not using delete_inventory_item in backend because it deletes the entire thing
            const response = await fetch("http://localhost:8000/inventory/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: itemName, quantity:itemQuantity}),
            });

            onItemRemoved();
        }
        catch (error) {
            console.error("Failed to add item:", error)
        }
    }

   const handleItemQuantity = async (event) => {
        const rawValue = event.target.value;

        const cleanValue = rawValue.replace(/[^0-9]/g, '');

        setItemQuantity(cleanValue);
   }

   return (
        <div className ="fixed inset-0 bg-black/30">
            <div className ="fixed top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-white border border-gray-300 rounded-xl">
            <button className ="absolute top-4 right-4 text-2xl leading-none cursor-pointer
             text-gray-500 hover:text-gray-800" type = "button">&times;</button>
            <form className = "m-4" onSubmit={handleItemRemoveSubmit}>
                <div className = "flex flex-col gap-5">
                    <div className = "flex flex-col gap-3">
                        <h1 className ="text-3xl">Item Name:</h1>
                        <input className="w-64 h-10 
                        bg-gray-100 rounded p-3
                        text-2xl" type="text" placeholder="Caviar..."
                        onChange ={(e) => setItemName(e.target.value)}
                        ></input>
                    </div>

                    <div className = "flex flex-col gap-3">
                        <h1 className = "text-3xl"> Quantity</h1>
                        <input className ="w-64 h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                        bg-gray-100 rounded p-3 text-2xl" type="number" value="1" max = "100" placeholder="5..." 
                        onChange={handleItemQuantity} inputMode="numeric"
                        ></input>
                    </div>
                </div>
                <button className ="cursor-pointer" type="submit" disabled ={isInputEmpty}>
                    Submit
                </button>
            </form>

            </div>
        </div>

   );
}