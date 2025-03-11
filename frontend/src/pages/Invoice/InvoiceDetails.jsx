import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useInvoice } from "../../Context/InoviceContext";

const InvoiceDetails = () => {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { getbyInvoiceId, byInvoiceId, isLoadInvoice } = useInvoice();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await getbyInvoiceId(id);
    };
    fetchData();
  }, [id]); // Added getbyInvoiceId

  const items =
    byInvoiceId?.products?.map((product) => ({
      id: product?.product_id?._id,
      description: product?.product_id?.name,
      qty: product?.quantity,
      price: product?.price,
    })) || [];

  const totalAmount = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  if (isLoadInvoice) return <Loader />;

  const totalRows = 15;
  // const emptyRows = totalRows - items.length;

  return (
    <>
      {" "}
      <div className=" flex justify-end ">
        <button
          type="button"
          onClick={reactToPrintFn}
          className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
      <div className="flex flex-col items-center   min-h-screen">
        {/* Print Button */}

        <div
          ref={contentRef}
          className="w-full max-w-3xl bg-white p-6  rounded-lg"
        >
          {/* Header Section */}
          <div className="border-b-2 border-black pb-4 mb-4 text-center">
            <h1 className="text-3xl font-extrabold uppercase tracking-wider text-gray-900">
              ElectroTech Solutions
            </h1>
            <p className="font-semibold text-gray-700 text-sm tracking-wide">
              Authorized Dealer in Electronic Products
            </p>
            <p className="text-gray-600 text-sm">
              Main Road, Ahmedabad, Gujarat, India
            </p>

            {/* Contact & Business Info */}
            <div className="mt-3 flex justify-between text-sm font-medium text-gray-900">
              <p>
                <span className="font-semibold">Phone:</span> +91 9981278197
              </p>
              <p>
                <span className="font-semibold">GSTIN:</span> 08AALCR2857A1ZD
              </p>
              <p>
                <span className="font-semibold">PAN Number:</span> AVHPC9999A
              </p>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="grid grid-cols-2 gap-4 text-sm font-medium border-b-2 border-black pb-4">
            <div>
              <p>
                <strong>INVOICE NO:</strong> INV-001
              </p>
              <p>
                <strong>DATE:</strong> 10-02-2025
              </p>
              <p>
                <strong>PAYMENT MODE:</strong> Cash/Card/UPI
              </p>
            </div>
            <div>
              <p>
                <strong>CUSTOMER NAME:</strong> John Doe
              </p>
              <p>
                <strong>CONTACT:</strong> 9876543210
              </p>
              <p>
                <strong>ADDRESS:</strong> Ahmedabad, Gujarat
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border border-black mt-4 text-sm">
            <thead>
              <tr className="bg-gray-200 text-center font-semibold">
                <th className="border border-black p-2">Sr No</th>
                <th className="border border-black p-2">Item Description</th>
                <th className="border border-black p-2">Qty</th>
                <th className="border border-black p-2">Price</th>
                <th className="border border-black p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {byInvoiceId?.products?.length > 0 ? (
                byInvoiceId.products.map((product, index) => (
                  <tr key={product._id} className="text-center">
                    <td className="border border-black p-2">{index + 1}</td>
                    <td className="border border-black p-2 text-left">
                      {product.product_id.name}
                    </td>
                    <td className="border border-black p-2">
                      {product.quantity}
                    </td>
                    <td className="border border-black p-2">
                      ₹{product.price}
                    </td>
                    <td className="border border-black p-2">
                      ₹{product.FinalPrice}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No products found in invoice.
                  </td>
                </tr>
              )}
              {Array.from({
                length: totalRows - (byInvoiceId?.products?.length || 0),
              }).map((_, index) => (
                <tr key={`empty-${index}`} className="text-center">
                  <td className="border border-black p-2">{""}</td>
                  <td className="border border-black p-2 text-left">&nbsp;</td>
                  <td className="border border-black p-2">&nbsp;</td>
                  <td className="border border-black p-2">&nbsp;</td>
                  <td className="border border-black p-2">&nbsp;</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td className="border border-black p-2 text-right" colSpan={4}>
                  Total:
                </td>
                <td className="border border-black p-2 text-center">
                  ₹{byInvoiceId.total_price}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Footer Section */}
          {/* Footer Section */}
          <div className="mt-6 border-t border-black pt-4 flex justify-between text-sm">
            {/* Terms & Conditions */}
            <div className="w-1/2 pr-8 items-center">
              <h2 className="font-bold text-lg  mb-2 ">Terms & Conditions</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>No return deal.</li>
                <li>Customer will pay the GST.</li>
                <li>Customer will bear the delivery charges.</li>
                <li>Payment due within 15 days.</li>
              </ul>
            </div>

            {/* Authorized Signatory */}
            <div className="w-1/2 text-right flex flex-col items-center ">
              <h2 className="font-bold text-lg  ">Authorized Signatory</h2>
              <p className="font-semibold text-gray-800 mb-8">
                For Akash Enterprises
              </p>

              {/* Signature Section */}
              <div className="flex flex-col items-center py-6">
                <div className="border-t border-black w-40 mb-1"></div>
                <p className="text-gray-700">Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
