import DisplayProducts from "./DisplayProducts";
import AddProduct from "./AddProduct";
import EditProducts from "./EditProducts";
import { ProductProvider } from "../../Context/ProductContext";

const ProductsManagement = () => {
  return (
    <div className="justify-center">
      <section className="">
        {/* Product Table */}
        <AddProduct />
        <DisplayProducts />
      </section>
    </div>
  );
};

export default ProductsManagement;
