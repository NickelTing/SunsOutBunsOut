import { Form } from "react-router-dom";
import type { Burger } from '../Models/Burgers';

// Define the Burger component
export default function Burger() {
  const burger: Burger = {
    id: 100,
    Name: "Nickel Burger",
    Description: "The best burger in the shop",
    IsGlutenFree: true,
  };

  return (
    <div id="burger">
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

        {burger.Description && <p>{burger.Description}</p>}

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
