import { redirect, ActionFunction, LoaderFunctionArgs } from "react-router-dom";
import { deleteBurger } from "../burger";

// Define the action function with type annotations
export const action: ActionFunction = async ({ params }: LoaderFunctionArgs) => {
    if (params && params.burgerId) {
        throw new Error("oh dang!");
        // await deleteBurger(params.burgerId);
        // return redirect("/");
    } else {
        // Handle the case where burgerId is undefined or not provided
        throw new Error("Burger ID is required to delete a burger");
    }
};
