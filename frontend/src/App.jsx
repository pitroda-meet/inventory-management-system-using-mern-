import { BrandProvider } from "./Context/BrandContext";
import { CartContextProvider } from "./Context/CartContext";
import { CategoryProvider } from "./Context/CategoryContext";
import { InvoiceProvider } from "./Context/InoviceContext";
import { ProductProvider, useProductContext } from "./Context/ProductContext";
import { StockProvider } from "./Context/StockContext";
import { SupplierProvider } from "./Context/SupplierContext";
import { UserProvider } from "./Context/UserContext";
import AppRouters from "./Routes";

function App() {
  return (
    <>
      <UserProvider>
        <StockProvider>
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
        </StockProvider>
      </UserProvider>
    </>
  );
}

export default App;
