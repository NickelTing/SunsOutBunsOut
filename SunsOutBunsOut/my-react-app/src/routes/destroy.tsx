import { ActionFunctionArgs, redirect,  } from "react-router-dom";
// @ts-ignore
import { deleteContact } from "../contacts.ts";

export async function action({ params }: ActionFunctionArgs) {
    throw new Error("oh dang!");
    await deleteContact(params.contactId);
    return redirect("/");
}