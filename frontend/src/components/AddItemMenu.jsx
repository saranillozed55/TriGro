import {useState} from "react"

export default function AddItemMenu({onItemAdded, onClosePerformed}) {

    //TODO: send the item/create the item here to backend

    const[itemName, setItemName] = useState('');
    const[itemQuantity, setItemQuantity] = useState(1);
    const isInputEmpty = itemName.trim() === '' || itemQuantity === 0;

    const handleItemSubmit = async (event) => {

        event.preventDefault();

        try {
            //send post request
            const response = await fetch("http://localhost:8000/inventory/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: itemName, quantity: itemQuantity}),
            });

            const data = await response.json();
            console.log(data.name, "was added to database.");

            onItemAdded();

        } catch (error) {
            console.error("Failed to add item:", error);
        }
    }
    const handleItemQuantity = async (event) => {
        const rawValue = event.target.value;

        const cleanValue = rawValue.replace(/[^0-9]/g, '');

        setItemQuantity(cleanValue);
    }

    //later on add a popup that shows if the item was added or not

    return(
        <div className ="fixed inset-0 bg-black/30">
            <div className ="fixed top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-white border border-gray-300 rounded-xl">
            <button className ="absolute top-4 right-4 text-2xl leading-none cursor-pointer
             text-gray-500 hover:text-gray-800" type = "button" onClick={onClosePerformed}>&times;</button>
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