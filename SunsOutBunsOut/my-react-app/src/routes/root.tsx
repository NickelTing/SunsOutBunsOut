import { useState, useEffect } from "react";
import {
  Outlet,
  NavLink,
  Link,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  LoaderFunction,
  LoaderFunctionArgs,
  useSubmit,
  useLocation,
} from "react-router-dom";
import { getBurgers, createBurger } from "../Services/BurgerService";
import type { Burger } from '../Models/Burgers';
import { useTheme } from '../ThemeContext'; // Import the theme context
import BurgerMenu from "./menu";

// Define the type for the loader return value
interface LoaderData {
  burgers: Burger[];
  q: string | undefined;
}

export async function action() {
  const burger = await createBurger();
  return redirect(`/burgers/${burger.id}/edit`);
}

// Loader function
export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs): Promise<LoaderData> => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? undefined;
  const burgers = await getBurgers(q);
  return { burgers, q };
};

// Root component
export default function Root() {
  const { burgers, q } = useLoaderData() as LoaderData;
  const navigation = useNavigation();
  const submit = useSubmit();
  const { theme, toggleTheme } = useTheme(); // Use the theme context
  const location = useLocation(); // Get the current location

  // State for managing sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const inputElement = document.getElementById("q") as HTMLInputElement | null;
    if (inputElement) {
      inputElement.value = q ?? "";
    }
  }, [q]);

  const handleToggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  // Determine if the sidebar should be shown based on the current path
  const showSidebar = !location.pathname.startsWith('/menu');

  return (
    <>
      {showSidebar && (
        <div id="sidebar-container" className={isCollapsed ? "collapsed" : "expanded"}>
          {isCollapsed ? (
            <button className="expand-button" onClick={handleToggleCollapse}>
              &#9776;
            </button>
          ) : (
            <>
              <div id="sidebar">
                <h1>SunsOutBunsOut</h1>
                <div>
                  <button onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark' : 'Light'}
                  </button>
                  <button>
                    <Link to="/menu" className="no-underline-link">Menu</Link>
                  </button>
                  <button onClick={handleToggleCollapse}>
                    {isCollapsed ? 'Expand' : <span>&#9776;</span>}
                  </button>
                </div>
                <div>
                  <Form id="search-form" role="search">
                    <input
                      id="q"
                      className={searching ? "loading" : ""}
                      aria-label="Search burgers"
                      placeholder="Search"
                      type="search"
                      name="q"
                      defaultValue={q}
                      onChange={(event) => {
                        const isFirstSearch = q == null;
                        submit(event.currentTarget.form, {
                          replace: !isFirstSearch,
                        });
                      }}
                    />
                    <div id="search-spinner" aria-hidden hidden={!searching} />
                    <div className="sr-only" aria-live="polite"></div>
                  </Form>
                  <Form method="post">
                    <button type="submit">New</button>
                  </Form>
                </div>
                <nav>
                  {burgers.length ? (
                    <ul>
                      {burgers.map((burger) => (
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
                              {burger.name ? burger.name : <i>No Burger</i>}{" "}
                            </Link>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p><i>No burger</i></p>
                  )}
                </nav>
              </div>
            </>
          )}
        </div>
      )}
      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
}
