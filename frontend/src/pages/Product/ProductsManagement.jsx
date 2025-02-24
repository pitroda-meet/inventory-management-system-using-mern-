import DisplayProducts from "./DisplayProducts";
import AddProduct from "./AddProduct";
import EditProducts from "./EditProducts";
import { ProductProvider } from "../../Context/ProductContext";
import Category from "./Category";
import Brands from "./Brands";

const ProductsManagement = () => {
  return (
    <div className="justify-center">
      <section className="">
        {/* Product Table */}
        <AddProduct />
        <Category />
        <Brands />
        <DisplayProducts />
      </section>
    </div>
  );
};

export default ProductsManagement;
