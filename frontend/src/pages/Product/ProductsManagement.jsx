import DisplayProducts from "./DisplayProducts";
import AddProduct from "./AddProduct";
import EditProducts from "./EditProducts";
import { useProductContext } from "../../Context/ProductContext";
import Category from "./Category";
import Brands from "./Brands";
import { useEffect } from "react";

const ProductsManagement = () => {
  const { fetchProduct } = useProductContext();
  useEffect(() => {
    fetchProduct();
  }, []);
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
