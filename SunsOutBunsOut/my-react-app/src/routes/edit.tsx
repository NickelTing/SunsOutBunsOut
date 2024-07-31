import { 
  Form, 
  useLoaderData,
  redirect,
  ActionFunction,
  LoaderFunctionArgs,
  useNavigate,
} from "react-router-dom";
import { useState } from 'react';
import { Burger } from "../Models/Burgers";
import { updateBurger } from "../burger";

// Define the type for the loader return value
interface LoaderData {
  burger: Burger;
}

// Define a type that allows for string, boolean, and FormDataEntryValue values
type FormDataUpdates = {
  [key: string]: string | boolean | FormDataEntryValue;
}

export const action: ActionFunction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const updates: FormDataUpdates = Object.fromEntries(formData.entries());

  // Convert string to boolean
  if (typeof updates.IsGlutenFree === 'string') {
      updates.IsGlutenFree = updates.IsGlutenFree.toLowerCase() === 'true';
  }

  if (params.burgerid) {
      await updateBurger(params.burgerid, updates);
      return redirect(`/burgers/${params.burgerid}`);
  } else {
      // Handle the case where burgerId is undefined
      return redirect("/burgers");
  }
};

export default function EditBurger() {
  const { burger } = useLoaderData() as LoaderData;
  const navigate = useNavigate();


  // Initialize local state for IsGlutenFree
  const [isGlutenFree, setIsGlutenFree] = useState(burger.IsGlutenFree);

  // Handle the toggle button click
  const toggleGlutenFree = () => {
    setIsGlutenFree(prevState => !prevState);
  };

  return (
    <Form method="post" id="burger-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Burger Name"
          aria-label="Name"
          type="text"
          name="Name"
          defaultValue={burger?.Name}
        />
      </p>
      <label>
        <span>Description</span>
        <textarea
            placeholder="Some Interesting Facts"
          name="Description"
          defaultValue={burger?.Description}
          rows={3}
        />
      </label>
      <label>
        <span>Price</span>
        <input
          placeholder="No Decimals"
          aria-label="Price"
          type="text"
          name="Price"
          defaultValue={burger?.Price}
        />
      </label>
      <label>
        <span>Image</span>
        <input
          placeholder="Image URL"
          aria-label="Image"
          type="text"
          name="Image"
          defaultValue={burger?.Image}
        />
      </label>
      <p>
        <span>Gluten-Free?</span>
        <button
          type="button"
          name="IsGlutenFree"
          onClick={toggleGlutenFree}
          className={`gluten-free-btn ${isGlutenFree ? 'gluten-free' : 'not-gluten-free'}`}
        >
          {isGlutenFree ? "✔️" : "❌"}
        </button>
        {/* Hidden input field to submit the gluten-free state */}
        <input type="hidden" name="IsGlutenFree" value={isGlutenFree ? "true" : "false"} />
      </p>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );  
}
