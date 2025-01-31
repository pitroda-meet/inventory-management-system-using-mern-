import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Layouts/Dashboard.tsx";
import ProductsManagement from "./Layouts/ProductsManagement.tsx";
import SalesOrder from "./Layouts/SalesOrder.tsx";
import Settings from "./Layouts/Settings.tsx";
import Customers from "./Layouts/Customers.tsx";
import Suppliers from "./Layouts/Suppliers.tsx";
import Invoice from "./Layouts/Invoice.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/productsmanagement", element: <ProductsManagement /> },
      { path: "/orders", element: <SalesOrder /> },
      { path: "/setting", element: <Settings /> },
      { path: "/customers", element: <Customers /> },
      { path: "/supplier", element: <Suppliers /> },
      { path: "/invoice", element: <Invoice /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
