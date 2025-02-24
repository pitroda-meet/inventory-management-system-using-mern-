import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Signin from "../pages/Authenthication/Signin";
import ProtectedRoute from "./ProtectedRoute";
import ProductsManagement from "../pages/Product/ProductsManagement";
import EditProducts from "../pages/Product/EditProducts";
import Customers from "../pages/Customers";
import Suppliers from "../pages/Suppliers";
import Invoice from "../pages/Invoice/Invoice";
import SalesOrder from "../pages/OrderSales/SalesOrderMain";
import Cart from "../pages/Cart/Cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index path="signin" element={<Signin />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/productsmanagement" element={<ProductsManagement />} />
          <Route path="/editproduct/:id" element={<EditProducts />} />{" "}
          <Route path="/orders" element={<SalesOrder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/supplier" element={<Suppliers />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Route>
    </Route>
  )
);

const AppRouters = () => {
  return <RouterProvider router={router} />;
};
export default AppRouters;
