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
} from './routes/root';

import ErrorPage from './error-page';

import Contact, {
  loader as contactLoader
} from "./routes/contact";

import EditContact, {
  action as editAction
} from "./routes/edit";

import { action as destroyAction } from "./routes/destroy";

import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    // shows the main page
    element: < Root />,
    errorElement: <ErrorPage />,
    // loader uses the getContacts function to get all contacts
    loader: rootLoader,
    // action uses the createContacts function to create a contact
    action: rootAction,
    children: [
      {index: true, element: <Index />},
      {
        path: "contacts/:contactId",
        // shows the specific contact page given the specific ID
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
