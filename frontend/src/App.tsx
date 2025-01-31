import { Outlet } from "react-router-dom";
import Sidebar from "./Component/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default App;
