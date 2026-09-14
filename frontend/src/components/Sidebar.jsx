import { useState, useEffect } from "react";

export default function Sidebar() {

    const[count, setCount] = useState(0);
    const[loading, setLoading] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8000/api/count')
        .then((res) => res.json())
        .then((data) => setCount(data.counter))
        .catch((err) => console.error("Error:", err))
    }, [])

    const handleIncrement = async () => {
        setLoading(true);
        try{
            const response = await fetch('http://localhost:8000/api/increment', {
                method: 'POST'
            });
            const data = await response.json();
            setCount(data.counter); //update ui
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };

    return(

        <section className ="
        fixed
        flex
        flex-col
        left-0
        h-screen
        top-0
        w-64
        bg-gray-800
        justify-start
        items-center
        text-center
        ">
            <h1 className = "text-3xl font-bold"><span className = "text-emerald-100">TriGrow</span></h1>
            <div className ="
            flex
            flex-col
            gap-4
            mt-10
            z-50
             text-white">
                <a href ="#" 
                className ="
                inline-block
                hover:bg-blue-100 
                hover:text-black 
                transition-colors duration-300
                py-2
                px-4
                rounded
                ">My Inventory</a>
                
                <a href = "#"
                className ="
                inline-block
                hover:bg-blue-100 
                hover:text-black 
                transition-colors duration-300
                py-2
                px-4
                rounded
                " >Stores</a>
                <button onClick = {handleIncrement} disabled = {loading} className = "cursor-pointer">Incrment Value</button>
                <p>Current Count: {count}</p>
            </div>
        </section>
    );
}