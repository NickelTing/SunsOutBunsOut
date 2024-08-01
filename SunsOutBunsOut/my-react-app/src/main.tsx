import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import './index.css';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import ErrorPage from './routes/error-page';
import Burger, { loader as burgerLoader } from './routes/burger';
import EditBurger, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes/index';
import { ThemeProvider, useTheme } from './ThemeContext'; // Import your ThemeProvider
import BurgerMenu from './routes/menu'; // Adjust the path as needed

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
          {
            path: 'menu',
            element: <BurgerMenu />, // New route for BurgerMenu
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

  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
