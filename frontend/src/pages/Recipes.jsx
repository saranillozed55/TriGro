import RecipeSearchCard from "../components/RecipeSearchCard";
import {recipeCards} from "../data/RecipeCard";


export default function Recipes() {
    

    return(
        <>
            <div>
                <div className ="flex flex-col gap-3 py-3">
                    <h2 className="text-3xl font-semibold text-gray-900">Recipes</h2>
                </div>
                <div className ="grid grid-cols-2 gap-6">
                    {recipeCards.map((card) => (
                        <RecipeSearchCard key={card.label} title={card.label} description={card.description}/>
                    ))}
                </div>
            </div>
        </>
    )
}