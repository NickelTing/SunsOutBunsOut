import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root, { 
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from './routes/error-page';
import Burger, {
  loader as burgerLoader,
} from './routes/burger';
import EditBurger, {
  action as editAction,
} from './routes/edit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "burgers/:burgerid",
        element: <Burger />,
        loader: burgerLoader,
      },
      {
        path: "burgers/:burgerid/edit",
        element: <EditBurger />,
        loader: burgerLoader,
        action: editAction,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)