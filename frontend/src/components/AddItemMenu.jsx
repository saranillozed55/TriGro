import {useState} from "react"

export default function AddItemMenu() {

    //TODO: send the item/create the item here to backend

    const[itemName, setItemName] = useState('');
    const[itemQuantitiy, setItemQuantity] = useState(1);
    const isInputEmpty = itemName.trim() === '';

    const handleItemSubmit = async (event) => {

        event.preventDefault();

        try {
            //send post request
            const response = await fetch("http://localhost:8000/inventory/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: itemName, quantity: itemQuantitiy}),
            });

            const data = await response.json();
            console.log(data.name, "was added to database.")
        } catch (error) {
            console.error("Failed to add item:", error);
        }
    }

    return(
        <div className ="fixed inset-0 bg-black/30">
            <div className ="fixed top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-white border border-gray-300 rounded-xl">
            <form className = "m-4" onSubmit={handleItemSubmit}>
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
                        <input className ="w-64 h-10 
                        bg-gray-100 rounded p-3 text-2xl" type="number" placeholder="5..." 
                        onChange={(e) => setItemQuantity(e.target.value)}
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