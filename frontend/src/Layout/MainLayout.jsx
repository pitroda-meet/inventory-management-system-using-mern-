import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBoxOpen,
  faFileInvoice,
  faFileInvoiceDollar,
  faIndustry,
  faShoppingCart,
  faUsers,
  faClose,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

//
import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="absolute md:hidden z-30 bg-gray-50 h-min w-full flex justify-end items-center px-2 py-2 shadow-sm">
        <button
          className="size-fit float-end z-0 bg-gray-200 py-1 px-3 rounded-md hover:ring-1 hover:ring-black"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 md:w-60 overflow-y-auto bg-white shadow-lg z-30 lg:relative lg:w-64 w-60 flex flex-col h-screen transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="flex justify-between shadow-sm p-4 py-2 md:py-4 gap-3 items-center">
              <div className="w-full md:text-xl font-semibold px-4">
                <div>
                  Venture <span className="text-blue-500">Connect</span>
                </div>
              </div>
              <button
                className="bg-gray-200 px-3 py-1 rounded-md hover:ring-1 hover:ring-black hover:cursor-pointer md:hidden"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col my-4 space-y-2 px-4">
              <NavLink
                to="/dashboard"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? " text-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faHome} transform="rotate-315" />
                Dashboard
              </NavLink>
              <NavLink
                to="/productsmanagement"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faBoxOpen} />
                Products
              </NavLink>
              <NavLink
                to="/orders"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                Orders & Sales
              </NavLink>

              <NavLink
                to="/customers"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faUsers} />
                Customers
              </NavLink>

              <NavLink
                to="/supplier"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faIndustry} />
                Suppliers
              </NavLink>
              <NavLink
                to="/invoice"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faFileInvoice} />
                Invoice
              </NavLink>
              <NavLink
                to="/logout"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 rounded ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-700 hover:bg-gray-100"
                  } transition-colors duration-200 font-semibold`
                }
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </NavLink>
            </nav>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <main className="flex-1 bg-neutral-50 overflow-y-auto md:ml-60 lg:ml-0 md:mt-0">
        {/* Fixed Navigation Bar */}
        <div className="hidden md:flex fixed top-0 left-0 w-full h-15 shadow-md bg-white items-center justify-end px-6 z-10">
          <NavLink to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </NavLink>
        </div>

        {/* Page Content */}

        <div className="md:mt-20 mt-14 mb-10 lg:px-8 md:px-7 px-5 p-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
