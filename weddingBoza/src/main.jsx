import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import GiftList from './GiftList.jsx';
import Gift from './components/Gift/Gift.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "/list",
    element: (
      <GiftList />
    ),
  },
  {
    path: "/error",
    element: (
      <ErrorPage />
    ),
  },
 
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
