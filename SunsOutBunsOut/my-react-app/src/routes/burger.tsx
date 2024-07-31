import { Form, useLoaderData, LoaderFunctionArgs  } from "react-router-dom";
import { getBurger } from "../burger";
import type { Burger } from '../Models/Burgers';
import burgerImage from '../assets/burger.png';

interface LoaderData {
  burger: Burger;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const burgerId = params.burgerid;
  if (!burgerId) {
    // Handle the case where burgerId is undefined
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  // Now burgerId is guaranteed to be a string
  const burger = await getBurger(burgerId);
  return { burger };
}

// Define the Burger component
export default function Burger() {
  const { burger } = useLoaderData() as LoaderData;
  console.log(burger)


  return (
    <div id="burger">
      <div>
        <img
          key={burger.Image}
          src={
            burger.Image ||
            burgerImage
          }
          alt="Burger Icon"
          style={{ height: '200px', width: 'auto' }} // Maintain aspect ratio
        />
      </div>

      <div>
        <h1>
          {burger.Name ? (
            <>
              {burger.Name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        <p>
          {burger.Description ? burger.Description : "No Description"}
        </p>

        <p>$ 
          {burger.Price ? burger.Price : "No Description"}
        </p>

        {burger.IsGlutenFree ? (
          <span role="img" aria-label="Gluten Free" className="gluten-free">
            Gluten-Free <span className="green-tick">✔️</span>
          </span>
        ) : (
          <span role="img" aria-label="Not Gluten Free" className="not-gluten-free">
            Gluten-Free ❌
          </span>
        )}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
