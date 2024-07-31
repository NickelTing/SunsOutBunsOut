import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import ErrorPage from './routes/error-page';
import Burger, { loader as burgerLoader } from './routes/burger';
import EditBurger, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes/index';
import { ThemeProvider, useTheme } from './ThemeContext'; // Import your ThemeProvider

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'burgers/:burgerid',
            element: <Burger />,
            loader: burgerLoader,
          },
          {
            path: 'burgers/:burgerid/edit',
            element: <EditBurger />,
            loader: burgerLoader,
            action: editAction,
          },
          {
            path: 'burgers/:burgerid/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>
          },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  const { theme } = useTheme();

  React.useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
