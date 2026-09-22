import { useState, useEffect, createContext, useContext} from "react";

const InventoryContext = createContext(null);

//Inventory data now lives outside of something that gets destroyed then re-rendered
export function InventoryProvider({children}) {
    
    const[inventory, setInventory] = useState([]);

    const handleGetAllInventory = async () => {
      try {
        const response = await fetch("http://localhost:8000/inventory/", {method: "GET"});

        const data = await response.json();
        
        setInventory(data);
      }
      catch(error) {
        console.error("Error fetching inventory:", error)
      }
    }

    useEffect(() => {
          handleGetAllInventory();
    }, [])
    
    return(
        <InventoryContext.Provider value = {{inventory, handleGetAllInventory}}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    const context = useContext(InventoryContext);
    if(!context) {
        throw new Error("useInventory must be used within an Inventory Provider");
    }
    return context;
}