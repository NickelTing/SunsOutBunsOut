import { 
  Outlet,
  NavLink, 
  Link, 
  useLoaderData,
  Form,
  redirect,
  useNavigation,
} from "react-router-dom";
import { getBurgers, createBurger } from "../burger";
import type { Burger } from '../Models/Burgers';

// Define the type for the loader return value
interface LoaderData {
  burgers: Burger[];
}

export async function action() {
  const burger = await createBurger();
  return redirect(`/burgers/${burger.id}/edit`);
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
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>SunsOutBunsOut</h1>
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
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {burgers.length ? (
            <ul>
              {burgers.map((burger: Burger) => (
                <li key={burger.id}>
                  <NavLink
                    to={`burgers/${burger.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                  <Link to={`burgers/${burger.id}`}>
                    {burger.Name ? (
                      <>
                        {burger.Name}
                      </>
                    ) : (
                      <i>No Burger</i>
                    )}{" "}
                  </Link>
                  </NavLink>
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
      <div id="detail"
      className={navigation.state === "loading" ? "loading" : ""
      }
      >
        <Outlet />
      </div>
    </>
  );
}
