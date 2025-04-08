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
import Suppliers from "../pages/Supplier/Suppliers";
import Invoice from "../pages/Invoice/Invoice";
import SalesOrder from "../pages/OrderSales/SalesOrderMain";
import Cart from "../pages/Cart/Cart";
import InvoiceMain from "../pages/Invoice/InvoiceMain";
import InvoiceDetails from "../pages/Invoice/InvoiceDetails";
import Stock from "../pages/Stock/Stock";
import UserMain from "../pages/Authenthication/UserMain";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="signin" element={<Signin />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/productsmanagement" element={<ProductsManagement />} />
          <Route path="/editproduct/:id" element={<EditProducts />} />{" "}
          <Route path="/orders" element={<SalesOrder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/supplier" element={<Suppliers />} />
          <Route path="/invoice" element={<InvoiceMain />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/user" element={<UserMain />} />
          <Route path="/invoicedetails/:id" element={<InvoiceDetails />} />
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
