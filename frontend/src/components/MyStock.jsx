import { useState } from "react";


export default function MyStock() {

    const API_URL = 'http://localhost:8000/api/items'

    const[name, setName] = useState('');
    const[stock, setStock] = useState([])

    const isInputEmpty = name.trim() === '';
    //const isStockEmpty

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        try {
            // send post request to FastAPI
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                //doing this because HTTP networks cannot transmit raw JavaScript Memory Objects
                //FastAPI relies on Pydantic Models for datra validation. when we pass an application/json
                //header, FastAPI automatically catches the raw text string, interprets it as JSON, and maps it directly onto
                //Python data types

                body: JSON.stringify({name:name}),
            });
        

            const data = await response.json();
            console.log(data.message);
            setName('')
        }
        catch (error) {
            console.error('Error sending item:', error);
        }
    };

    const handleGetStock = async () =>
    {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            data.forEach(item => {
                console.log(item.name);
            })
            setStock(data);
        }
        catch(err) {
            console.log("Error getting stock:", err);
        }
    }

    const handleClearStock = async () => {
        
        try {
            const response = await fetch(API_URL, {
                method:"DELETE"
            });
            const data = await response.json();

            data.forEach(item => {
                console.log(item.name);
            })
            setStock(data);
        }
        catch(err) {
            console.log("Error getting stock:", err);
        }
    }
    // later on because it says we printing an empty string, we just want to not print empty string if we have an empty stock
    return (
        <form onSubmit={handleSubmit}>
            <div className = "">
                <label>Enter Item: </label>
                <input id="item-name" type="text" value={name} placeholder="Eggs..." onChange={(e) => setName(e.target.value)}
                className="bg-gray-100 px-4 py-2 rounded"></input>
                <button type="submit" disabled={isInputEmpty} className="
                cursor-pointer bg-emerald-200 px-4 py-2 rounded">Submit</button>
                                
                <section className ="flex flex-col items-start gap-2">
                    <button onClick={handleGetStock} className="
                    cursor-pointer bg-blue-500 px-4 py-2 rounded"><strong>Get Stock </strong></button>
                    <button onClick={handleClearStock} className="cursor-pointer
                     bg-blue-500 px-4 py-2 rounded"><strong>Clear Stock</strong></button>
                </section>

                <ul>
                    {stock.map((item, index) => (
                        <li key = {index}>{item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </form>
    );
}