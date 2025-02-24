import { BrandProvider } from "./Context/BrandContext";
import { CartContextProvider } from "./Context/CartContext";
import { CategoryProvider } from "./Context/CategoryContext";
import { InvoiceProvider } from "./Context/InoviceContext";
import { ProductProvider, useProductContext } from "./Context/ProductContext";
import { SupplierProvider } from "./Context/SupplierContext";
import AppRouters from "./Routes";

function App() {
  return (
    <>
      <CartContextProvider>
        <InvoiceProvider>
          <BrandProvider>
            <SupplierProvider>
              <CategoryProvider>
                <ProductProvider>
                  <AppRouters />
                </ProductProvider>
              </CategoryProvider>
            </SupplierProvider>
          </BrandProvider>
        </InvoiceProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
