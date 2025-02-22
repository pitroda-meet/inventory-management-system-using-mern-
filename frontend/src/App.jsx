import { ProductProvider, useProductContext } from "./Context/ProductContext";
import AppRouters from "./Routes";

function App() {
  return (
    <>
      <ProductProvider>
        <AppRouters />
      </ProductProvider>
    </>
  );
}

export default App;
