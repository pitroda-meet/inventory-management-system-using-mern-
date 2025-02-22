import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Signin from "../pages/Authenthication/Signin";
import ProtectedRoute from "./ProtectedRoute";
import ProductsManagement from "../pages/Product/ProductsManagement";
import EditProducts from "../pages/Product/EditProducts";
import SalesOrder from "../pages/SalesOrder";
import Customers from "../pages/Customers";
import Suppliers from "../pages/Suppliers";
import Invoice from "../pages/Invoice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index path="signin" element={<Signin />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productsmanagement" element={<ProductsManagement />} />
          <Route path="/editproduct/:id" element={<EditProducts />} />{" "}
          <Route path="/orders" element={<SalesOrder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/supplier" element={<Suppliers />} />
          <Route path="/invoice" element={<Invoice />} />
        </Route>
      </Route>
    </Route>
  )
);

const AppRouters = () => {
  return <RouterProvider router={router} />;
};
export default AppRouters;
