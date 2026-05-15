// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { DEMO_DATA, PLACEHOLDER_DATA } from "./invoicr/data/invoiceData";
// import { fetchAllData } from "./invoicr/api/invoiceApi";
// import { formatCombinedData } from "./invoicr/utils/dataFormatter";

// import SellerMetadata from "./invoicr/SellerMetadata";
// import BuyerDetails from "./invoicr/BuyerDetails";
// import ItemSummary from "./invoicr/ItemSummary";
// import GSTAmountSummary from "./invoicr/GSTAmountSummary";
// import BankFooter from "./invoicr/BankFooter";
// import DownloadControls from "./invoicr/DownloadControls";
// import InvoiceHeader from "./invoicr/InvoiceHeader";
// import Swal from "sweetalert2";

// export default function Invoice() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const invoiceRef = useRef(null);

//   const [isDemo, setIsDemo] = useState(true);
//   const [data, setData] = useState(DEMO_DATA); // Initialize with DEMO_DATA
//   const [loading, setLoading] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const [sellerData, setSellerData] = useState(null);
//   const [customerData, setCustomerData] = useState(null);
//   const [error, setError] = useState(null);

//   // Get purchase_id and customer_id from navigation state
//   const purchaseId = location.state?.purchase_id || "MPCP2026195";
//   const customerId = location.state?.customer_id;

//   // Handle data source change
//   useEffect(() => {
//     if (isDemo) {
//       setData(DEMO_DATA);
//     } else if (!sellerData && !customerData) {
//       setData(PLACEHOLDER_DATA);
//     }
//   }, [isDemo, sellerData, customerData]);

//   // Handle fetching data
//   const handleFetchData = async () => {
//     if (!purchaseId) {
//       setError("Purchase ID not found");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const { sellerData: seller, customerData: customer } =
//         await fetchAllData(purchaseId);

//       setSellerData(seller);
//       setCustomerData({customer,customer_Id:customerId});

//       const formattedData = formatCombinedData(seller, customer);
//       // console.log("Formatted Data:", formattedData); // Debug log

//       setData(formattedData);
//       setIsDemo(false);
//     } catch (err) {
//       // console.log("Fetch Error:", err);
//       setError(err.message);
//       setIsDemo(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all data from APIs on component mount
//   useEffect(() => {
//     if (purchaseId) {
//       handleFetchData();
//     }
//   }, [purchaseId]); // Add purchaseId as dependency

//   // Download invoice as PDF using canvas
//   const handleDownload = async () => {
//     if (!invoiceRef.current) return;

//     setDownloading(true);

//     try {
//       document.body.classList.add("pdf-capture");

//       const element = invoiceRef.current;
//       const originalStyles = {
//         paddingBottom: element.style.paddingBottom,
//         marginBottom: element.style.marginBottom,
//         boxShadow: element.style.boxShadow,
//       };

//       element.style.paddingBottom = "0px";
//       element.style.marginBottom = "0px";
//       element.style.boxShadow = "none";

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: "#ffffff",
//         scrollX: 0,
//         scrollY: -window.scrollY,
//         width: element.scrollWidth,
//         height: element.scrollHeight,
//         windowWidth: element.scrollWidth,
//         windowHeight: element.scrollHeight,
//         logging: false,
//         allowTaint: true,
//         foreignObjectRendering: false,
//         imageTimeout: 15000,
//         onclone: (clonedDoc) => {
//           const printHiddenElements =
//             clonedDoc.querySelectorAll(".print-hidden");
//           printHiddenElements.forEach((el) => {
//             el.style.display = "none";
//             el.style.visibility = "hidden";
//             el.style.opacity = "0";
//             el.style.height = "0";
//             el.style.overflow = "hidden";
//           });

//           const invoiceContainer =
//             clonedDoc.querySelector(".invoice-container");
//           if (invoiceContainer) {
//             invoiceContainer.style.margin = "0";
//             invoiceContainer.style.padding = "0";
//             invoiceContainer.style.boxShadow = "none";
//           }
//         },
//       });

//       const imgData = canvas.toDataURL("image/png", 1.0);
//       const pxToMm = (px) => px * 0.264583;
//       const pdfWidth = pxToMm(canvas.width);
//       const pdfHeight = pxToMm(canvas.height);

//       const orientation = pdfWidth > pdfHeight ? "l" : "p";
//       const pdf = new jsPDF(orientation, "mm", [pdfWidth, pdfHeight]);

//       pdf.addImage(imgData, "PNG", 0, 2, pdfWidth, pdfHeight - 2);

//       const filename = `Invoice_${data.invoiceNo}_${data.buyer.name.replace(/\s+/g, "_")}.pdf`;
//       pdf.save(filename);
//       Swal.fire({
//         icon: "success",
//         title: "DOWNLOADED!",
//         text: "इनवॉइस सफलतापूर्वक डाउनलोड हो गया है।",
//         timer: 2000,
//         showConfirmButton: false,
//         iconColor: "#059669", // Green color for the seal
//       }).then(() => {
//         setTimeout(() => navigate("/portal"), 500);
//       });
//       // Restore original styles
//       element.style.paddingBottom = originalStyles.paddingBottom;
//       element.style.marginBottom = originalStyles.marginBottom;
//       element.style.boxShadow = originalStyles.boxShadow;
//     } catch (err) {
//       // console.error("PDF generation failed:", err);
//       setError("Failed to generate PDF. Please try again.");
//       window.print();
//     } finally {
//       document.body.classList.remove("pdf-capture");
//       setDownloading(false);
//     }
//   };

//   // Print invoice
//   const handlePrint = () => {
//     window.print();
//     Swal.fire({
//       icon: "success",
//       title: "DOWNLOADED!",
//       text: "इनवॉइस सफलतापूर्वक डाउनलोड हो गया है।",
//       timer: 2000,
//       showConfirmButton: false,
//       iconColor: "#059669", // Green color for the seal
//     }).then(() => {
//       setTimeout(() => navigate("/portal"), 500);
//     });
//   };

//   // Clear API data and reset to demo
//   // const clearApiData = () => {
//   //   setSellerData(null);
//   //   setCustomerData(null);
//   //   setData(DEMO_DATA);
//   //   setError(null);
//   //   setIsDemo(true);
//   // };

//   // Go back to previous page
//   // const handleGoBack = () => {
//   //   navigate(-1);
//   // };

//   // Conditional rendering to prevent errors
//   if (!data) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading invoice data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-4 md:py-8 px-2 md:px-0">
//       {/* Print Styles */}
//       <style>{`
//         @media print {
//           body {
//             margin: 0 !important;
//             padding: 0 !important;
//             -webkit-print-color-adjust: exact !important;
//             print-color-adjust: exact !important;
//             background: white !important;
//           }
//           .print-hidden {
//             display: none !important;
//             visibility: hidden !important;
//             opacity: 0 !important;
//             height: 0 !important;
//             overflow: hidden !important;
//           }
//           .invoice-container {
//             box-shadow: none !important;
//             border: none !important;
//             padding: 0 !important;
//             margin: 0 auto !important;
//             max-width: 100% !important;
//             width: 100% !important;
//             min-height: auto !important;
//           }
//           .table-container {
//             overflow: visible !important;
//             page-break-inside: avoid !important;
//           }
//           @page {
//             margin: 0.5cm !important;
//             size: A4 !important;
//           }
//         }

//         .pdf-capture .print-hidden {
//           display: none !important;
//           visibility: hidden !important;
//           opacity: 0 !important;
//           height: 0 !important;
//           overflow: hidden !important;
//         }

//         .pdf-capture .invoice-container {
//           box-shadow: none !important;
//           margin: 0 !important;
//         }
//       `}</style>

//       {/* Control Panel Component */}
//       {/* <ControlPanel
//         isDemo={isDemo}
//         setIsDemo={setIsDemo}
//         loading={loading}
//         sellerData={sellerData}
//         purchaseId={purchaseId}
//         customerId={customerId}
//         error={error}
//         handleManualFetch={handleFetchData}
//         clearApiData={clearApiData}
//         handlePrint={handlePrint}
//         handleGoBack={handleGoBack}
//       /> */}

//       {/* Main Invoice Container */}
//       <div className="flex items-center justify-center" ref={invoiceRef}>
//         <div
//           className="invoice-container mx-auto bg-white p-4 md:p-10 font-sans text-gray-800 text-sm shadow-sm md:shadow-lg rounded-lg md:rounded-none"
//           style={{ maxWidth: "800px", width: "100%", minHeight: "1100px" }}
//         >
//           {/* Header Component */}
//           <InvoiceHeader sellerData={sellerData} data={data} />

//           {/* Seller & Metadata Component */}
//           <SellerMetadata data={data} />
//           {/* प्यारा सा नोटिफिकेशन पॉप-अप */}

//           {/* Buyer Details Component */}
//           <BuyerDetails data={data} />

//           {/* Item Summary Component */}
//           <ItemSummary data={data} />

//           {/* GST & Amount Summary Component */}
//           <GSTAmountSummary data={data} />

//           {/* Amount in Words */}
//           <div className="mt-8">
//             <p className="font-bold text-xs text-gray-600 mb-2">
//               Amount in Words
//             </p>
//             <p className="bg-red-50 p-2 rounded-md italic font-semibold text-sm text-blue-900 border border-red-200">
//               **<span>{data.totals?.inWords || "Zero Rupees Only"}</span>**
//               Only.
//             </p>
//           </div>

//           {/* Bank & Footer Component */}
//           <BankFooter data={data} />

//           {/* Footer Notes */}
//           <div className="mt-8 pt-4 text-center text-xs text-gray-500 border-t border-gray-300">
//             <p className="mb-1 italic font-medium">
//               Computer generated invoice, no signature required.
//             </p>
//             <p className="mb-1">
//               All disputes are subject to the jurisdiction of{" "}
//               <strong>{data.seller?.city || "Lucknow"}</strong> courts only.
//             </p>
//             <p>
//               Support Contact:{" "}
//               <span className="text-red-600 break-all">
//                 {data.seller?.supportEmail || data.contact || "N/A"}
//               </span>
//               {data.seller?.supportPhone && (
//                 <>
//                   {" "}
//                   |{" "}
//                   <span className="text-red-600">
//                     {data.seller.supportPhone}
//                   </span>
//                 </>
//               )}
//             </p>
//             {data.seller?.website && (
//               <a href={data.seller.website} className="mt-1">
//                 Website:{" "}
//                 <span className="text-blue-600 break-all">
//                   {data.seller.website}
//                 </span>
//               </a>
//             )}
//           </div>

//           {/* Download Controls Component */}
//           <DownloadControls
//             sellerData={sellerData}
//             customerData={customerData}
//             data={data}
//             purchaseId={purchaseId}
//             loading={loading}
//             downloading={downloading}
//             handleManualFetch={handleFetchData}
//             handlePrint={handlePrint}
//             handleDownload={handleDownload}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// PaymentReceipt.js
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Swal from "sweetalert2";

// Reuse existing invoice components and utilities
import { fetchAllData } from "./invoicr/api/invoiceApi";
import { formatCombinedData } from "./invoicr/utils/dataFormatter";
import InvoiceHeader from "./invoicr/InvoiceHeader";
import SellerMetadata from "./invoicr/SellerMetadata";
import BuyerDetails from "./invoicr/BuyerDetails";
import ItemSummary from "./invoicr/ItemSummary";
import GSTAmountSummary from "./invoicr/GSTAmountSummary";
import BankFooter from "./invoicr/BankFooter";

export default function PaymentReceipt() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from navigation state
  const purchaseId = location.state?.purchase_id ;
  const customerId = location.state?.customer_id ;

  // State for fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  // Ref for hidden invoice container (used for PDF generation)
  const hiddenInvoiceRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Redirect if missing required params
  useEffect(() => {
    if (!purchaseId || !customerId) {
      setError(
        "Missing purchase or customer information. Please go back and try again.",
      );
      setLoading(false);
    }
  }, [purchaseId, customerId]);

  // Fetch invoice data from APIs
  useEffect(() => {
    if (!purchaseId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { sellerData: seller, customerData: customer } =
          await fetchAllData(purchaseId);
        setSellerData(seller);
        setCustomerData({ customer, customer_Id: customerId });

        const formatted = formatCombinedData(seller, customer,customerId);
        setInvoiceData(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load invoice data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [purchaseId, customerId]);

  // PDF generation using the hidden invoice container
  const handleDownloadInvoice = async () => {
    if (!hiddenInvoiceRef.current || downloading) return;

    setDownloading(true);
    try {
      const element = hiddenInvoiceRef.current;

      // Temporarily make the hidden element visible for capture
      element.style.position = "fixed";
      element.style.top = "0";
      element.style.left = "0";
      element.style.width = "800px";
      element.style.zIndex = "-1";
      element.style.opacity = "1";
      element.style.visibility = "visible";

      await new Promise((resolve) => setTimeout(resolve, 100)); // allow layout

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });

      // Hide again
      element.style.position = "absolute";
      element.style.top = "-9999px";
      element.style.left = "-9999px";
      element.style.opacity = "0";
      element.style.visibility = "hidden";

      const imgData = canvas.toDataURL("image/png");
      const pxToMm = (px) => px * 0.264583;
      const pdfWidth = pxToMm(canvas.width);
      const pdfHeight = pxToMm(canvas.height);
      const orientation = pdfWidth > pdfHeight ? "l" : "p";
      const pdf = new jsPDF(orientation, "mm", [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const buyerName = invoiceData?.buyer?.name || "Customer";
      const fileName = `Invoice_${invoiceData?.invoiceNo || purchaseId}_${buyerName.replace(/\s+/g, "_")}.pdf`;
      pdf.save(fileName);

      Swal.fire({
        icon: "success",
        title: "Invoice Downloaded!",
        text: "Your invoice has been saved. Please keep your Customer ID safe for app authentication.",
        timer: 3000,
        showConfirmButton: false,
        iconColor: "#059669",
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Could not generate PDF. Please try again.",
      });
    } finally {
      setDownloading(false);
      // Ensure hidden div is fully hidden again
      if (hiddenInvoiceRef.current) {
        hiddenInvoiceRef.current.style.position = "absolute";
        hiddenInvoiceRef.current.style.top = "-9999px";
        hiddenInvoiceRef.current.style.left = "-9999px";
        hiddenInvoiceRef.current.style.opacity = "0";
        hiddenInvoiceRef.current.style.visibility = "hidden";
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your receipt...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/portal")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Portal
          </button>
        </div>
      </div>
    );
  }

  // No data (should not happen if fetch succeeded)
  if (!invoiceData) return null;

  // Extract customer name from invoice data (buyer name)
  const customerName = invoiceData.buyer?.name || "Valued Customer";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Green header */}
          <div className="bg-green-600 px-6 py-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-white mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-white">
              Payment Successful!
            </h1>
            <p className="text-green-100 mt-2">Thank you for your purchase</p>
          </div>

          {/* Welcome & User Info */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome, {customerName}!
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium">Purchase ID:</span> {purchaseId}
              </p>
              <div className="bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800">
                  Your Customer ID (IMPORTANT)
                </p>
                <p className="text-2xl font-mono font-bold text-yellow-900 mt-1">
                  {customerId}
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  ⚠️ You will need this Customer ID to authenticate and download
                  our app.
                </p>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="px-6 py-4 bg-red-50 border-b border-red-100">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="font-bold text-red-800">
                  Critical: Save your Customer ID
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Without this Customer ID, you will{" "}
                  <strong>not be able to download the app</strong> or access
                  your account. Please copy it now and store it in a safe place.
                </p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="px-6 py-6 bg-gray-50 flex justify-center">
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                downloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md"
              }`}
            >
              {downloading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Invoice (PDF)
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-100 text-center text-xs text-gray-500">
            <p>A copy of the invoice has been sent to your registered email.</p>
            <p className="mt-1">
              Need help? Contact{" "}
              {invoiceData.seller?.supportEmail || "support@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Hidden Invoice Container - used only for PDF generation */}
      <div
        ref={hiddenInvoiceRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "800px",
          backgroundColor: "white",
          zIndex: -1,
          opacity: 0,
          visibility: "hidden",
        }}
        className="p-4 md:p-10 font-sans text-gray-800 text-sm"
      >
        {/* Same invoice layout as your Invoice component */}
        <InvoiceHeader sellerData={sellerData} data={invoiceData} />
        <SellerMetadata data={invoiceData} />
        <BuyerDetails data={invoiceData} customerId={customerId} />
        <ItemSummary data={invoiceData} />
        <GSTAmountSummary data={invoiceData} />
        <div className="mt-8">
          <p className="font-bold text-xs text-gray-600 mb-2">
            Amount in Words
          </p>
          <p className="bg-red-50 p-2 rounded-md italic font-semibold text-sm text-blue-900 border border-red-200">
            **<span>{invoiceData.totals?.inWords || "Zero Rupees Only"}</span>**
            Only.
          </p>
        </div>
        <BankFooter data={invoiceData} />
        <div className="mt-8 pt-4 text-center text-xs text-gray-500 border-t border-gray-300">
          <p className="mb-1 italic font-medium">
            Computer generated invoice, no signature required.
          </p>
          <p className="mb-1">
            All disputes are subject to the jurisdiction of{" "}
            <strong>{invoiceData.seller?.city || "Lucknow"}</strong> courts
            only.
          </p>
          <p>
            Support Contact:{" "}
            <span className="text-red-600 break-all">
              {invoiceData.seller?.supportEmail || invoiceData.contact || "N/A"}
            </span>
            {invoiceData.seller?.supportPhone && (
              <>
                {" "}
                |{" "}
                <span className="text-red-600">
                  {invoiceData.seller.supportPhone}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
