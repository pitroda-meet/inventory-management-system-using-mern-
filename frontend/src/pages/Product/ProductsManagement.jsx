import DisplayProducts from "./DisplayProducts";
import AddProduct from "./AddProduct";
import EditProducts from "./EditProducts";
import { useProductContext } from "../../Context/ProductContext";
import Category from "./Category";
import Brands from "./Brands";
import { useEffect } from "react";
import { useCategory } from "../../Context/CategoryContext";
import { useBrand } from "../../Context/BrandContext";
import { useUser } from "../../Context/UserContext";

const ProductsManagement = () => {
  const { fetchProduct } = useProductContext();
  const { fetchCategory } = useCategory();
  const { fetchbrand } = useBrand();
  const { userData } = useUser();
  useEffect(() => {
    if (userData.token) {
      fetchProduct();
      fetchCategory();
      fetchbrand();
    }
  }, [userData.token]);
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
