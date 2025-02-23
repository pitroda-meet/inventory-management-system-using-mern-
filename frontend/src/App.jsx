import { BrandProvider } from "./Context/BrandContext";
import { CategoryProvider } from "./Context/CategoryContext";
import { ProductProvider, useProductContext } from "./Context/ProductContext";
import { SupplierProvider } from "./Context/SupplierContext";
import AppRouters from "./Routes";

function App() {
  return (
    <>
      <SupplierProvider>
        <BrandProvider>
          <CategoryProvider>
            <ProductProvider>
              <AppRouters />
            </ProductProvider>
          </CategoryProvider>
        </BrandProvider>
      </SupplierProvider>
    </>
  );
}

export default App;
