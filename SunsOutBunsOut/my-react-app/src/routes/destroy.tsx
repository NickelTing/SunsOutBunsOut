import { redirect, ActionFunction, LoaderFunctionArgs } from "react-router-dom";
import { deleteBurger } from "../Services/BurgerService";

// Define the action function with type annotations
export const action: ActionFunction = async ({ params }: LoaderFunctionArgs) => {
    console.log(params.burgerid)
    if (params && params.burgerid) {
        await deleteBurger(params.burgerid);
        return redirect("/");
    } else {
        // Handle the case where burgerId is undefined or not provided
        throw new Error("Burger ID is required to delete a burger");
    }
};
