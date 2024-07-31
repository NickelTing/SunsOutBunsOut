import { useRouteError } from "react-router-dom";

// Define a type for the error object
interface RouteError {
  statusText?: string;
  message?: string;
  // Add any other properties that you expect the error object to have
}

export default function ErrorPage() {
  // Type the error object using the defined RouteError type
  const error: RouteError = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
