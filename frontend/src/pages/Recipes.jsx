import { useState } from "react"
import RecipeSearchCard from "../components/RecipeSearchCard"


export default function Recipes() {

    const[search, setSearch] = useState('')
    
    const recipeCards = [
        {label: "Create Your Own!", icon: null},
        {label: "Search for Recipes!", icon: null},
        {label: "Search with your Ingredients!", icon: null}
    ]

    return(
        <>
            <div>
                <div className ="flex flex-col gap-3 py-3">
                    <h2 className="text-3xl font-semibold text-gray-900">Recipes</h2>
                </div>
                <div className ="grid grid-cols-2 gap-6">
                    {recipeCards.map((card) => (
                        <RecipeSearchCard key={card.label} title={card.label}/>
                    ))}
                </div>
            </div>
        </>
    )
}