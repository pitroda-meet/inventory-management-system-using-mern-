import React, { useEffect, useState } from "react";
import { Button } from "antd";
import InvoiceTable from "./InvoiceTable";
import SearchBox from "./SearchBox";
import { useInvoice } from "../../Context/InoviceContext";

const InvoiceMain = () => {
  const [searchText, setSearchText] = useState("");
  const { getInvoice, setInvoice } = useInvoice();

  useEffect(() => {
    getInvoice();
  }, [setInvoice]);
  return (
    <div className="p-6 bg-white rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <SearchBox
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <InvoiceTable searchText={searchText} />
    </div>
  );
};

export default InvoiceMain;
