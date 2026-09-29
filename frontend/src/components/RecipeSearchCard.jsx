
//there should be parameters here to set the name of it, destination, etc.
//parameter of text as well
import {motion} from "motion/react"

export default function RecipeSearchCard({title, description}) {

    return(
        <button className ="border-2 rounded w-3xl h-96 text-center flex flex-col gap-4 py-3 bg-amber-100 cursor-pointer">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <h2 className ="text-xl">{description}</h2>
        </button>
    )
}