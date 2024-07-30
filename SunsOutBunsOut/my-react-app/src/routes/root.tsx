import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getBurgers } from "../burger";
import type { Burger } from '../Models/Burgers';

// Define the type for the loader return value
interface LoaderData {
  burgers: Burger[];
}

// Loader function
export async function loader(): Promise<LoaderData> {
  const burgers = await getBurgers();
  return { burgers };
}

// Root component
export default function Root() {
  // Use useLoaderData with the correct type
  const { burgers } = useLoaderData() as LoaderData;

  return (
    <>
      <div id="sidebar">
        <h1>React Router Burgers</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search burgers"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          {burgers.length ? (
            <ul>
              {burgers.map((burger: Burger) => (
                <li key={burger.id}>
                  <Link to={`contacts/${burger.id}`}>
                    {burger.Name ? (
                      <>
                        {burger.Name}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No burger</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
