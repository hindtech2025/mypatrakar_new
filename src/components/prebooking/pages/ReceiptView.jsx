
import { FaArrowLeft } from "react-icons/fa";
import { LuPrinter } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/LG1.png";
import VoucherCard from "./VoucherCard";
import InvoiceHeader from "./InvoiceHeader";
import Swal from "sweetalert2";

export default function ReceiptView({ formData, setCurrentStep, recieptData }) {
  const receiptRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // ✅ REAL DATA MAPPING FROM API RESPONSE
  const displayData = {
    mediaHouse: recieptData?.media_house || formData?.mediaHouse,
    fullName: recieptData?.fullname || formData?.fullName,
    city: recieptData?.city || formData?.city || "LUCKNOW",
    state: recieptData?.state || formData?.state || "UTTAR PRADESH",
    regId: recieptData?.reg_no || formData?.regId,
    regType: recieptData?.reg_type === "1" ? "RNI" : "Social Media", // Adjust mapping if needed
    transactionId: recieptData?.transaction_id || "N/A",
    paymentMethod: recieptData?.payment_method || "Online Payment",
    prebookingId: recieptData?.prebooking_id || "N/A",
    couponCode: recieptData?.coupon_code || "MEDIAF3RRG",
    date: recieptData?.updated_at 
      ? new Date(recieptData.updated_at).toLocaleDateString("en-GB") 
      : new Date().toLocaleDateString("en-GB")
  };

  const handleDownload = async () => {
    document.body.classList.add("pdf-capture");
    try {
      setIsDownloading(true);

      Swal.fire({
        title: "Generating PDF...",
        html: "कृपया प्रतीक्षा करें, रसीद तैयार हो रही है।",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const element = receiptRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          const allText = clonedDoc.querySelectorAll("span, p, h4, h6, div");
          allText.forEach((el) => {
            el.style.lineHeight = "normal";
          });

          const badges = clonedDoc.querySelectorAll(".pdf-btn");
          badges.forEach((badge) => {
            badge.style.display = "inline-flex";
            badge.style.alignItems = "center";
            badge.style.justifyContent = "center";
            badge.style.paddingTop = "4px";
          });
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pxToMm = (px) => px * 0.264583;
      const pdfWidth = pxToMm(canvas.width);
      const pdfHeight = pxToMm(canvas.height);

      const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt_${displayData.mediaHouse}.pdf`);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "आपकी रसीद डाउनलोड हो गई है।",
        timer: 2000,
        showConfirmButton: false,
      });
      
      // Optional: Redirect or clear state
      setCurrentStep(1); 
    } catch (err) {
      // console.error("PDF generation failed", err);
      Swal.fire("Error", "PDF जनरेट नहीं हो सका।", "error");
    } finally {
      document.body.classList.remove("pdf-capture");
      setIsDownloading(false);
    }
  };

  return (
    <div className="pb-20"> {/* Bottom spacing for better view */}
      <div ref={receiptRef}>
        <div className="max-w-[700px] mx-auto space-y-4 sm:space-y-5 py-6 sm:py-8 lg:py-10 px-3 sm:px-4 lg:px-0 pdf-safe bg-[#F8F9FB]">
          
          {/* SUCCESS BANNER */}
          <div className="bg-[#F0FDF4] border border-[#80eda6] rounded-xl py-5 px-4 flex items-start sm:items-center gap-3">
            <div className="bg-[#06c94d] p-2.5 rounded-full text-white shrink-0">
              <IoMdCheckmarkCircleOutline className="text-2xl" />
            </div>
            <div>
              <h4 className="text-[#166534] font-black text-lg">
                Booking Successful!
              </h4>
              <p className="text-[#15803d] text-sm font-bold">
                Advance payment receipt generated for <span className="underline">{displayData.mediaHouse}</span>.
              </p>
            </div>
          </div>

          {/* RECEIPT CARD */}
          <div className="bg-white rounded-[35px] shadow-2xl overflow-hidden border border-gray-100">
            {/* HEADER */}
            <div className="bg-[#1A2B4C] p-6 sm:p-10 text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-3">
                  <img src={logo} alt="logo" className="w-44 object-contain" />
                  <p className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">
                    Development Advance Receipt
                  </p>
                </div>

                <div className="text-left sm:text-right w-full sm:w-auto">
                  <div className="pdf-btn bg-[#22C55E] text-white text-[10px] font-black px-4 pt-1.5 pb-2 rounded-full uppercase tracking-widest w-fit sm:ml-auto">
                    Paid
                  </div>

                  <div className="mt-4 space-y-1.5 text-[11px] sm:text-[12px]">
                    <div className="flex justify-between sm:justify-end gap-4">
                      <span className="text-slate-400 font-medium">Date:</span>
                      <span className="font-semibold">{displayData.date}</span>
                    </div>
                    <div className="flex justify-between sm:justify-end gap-4">
                      <span className="text-slate-400 font-medium">Booking ID:</span>
                      <span className="font-semibold">{displayData.prebookingId}</span>
                    </div>
                    <div className="flex justify-between sm:justify-end gap-4">
                      <span className="text-slate-400 font-medium">Txn ID:</span>
                      <span className="font-semibold truncate  pb-2">{displayData.transactionId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BODY - Passing displayData which now has API info */}
            <InvoiceHeader displayData={displayData} />
            <VoucherCard code={displayData.couponCode} />
          </div>

          {/* DISCLAIMER */}
          <div className="text-center pt-8 border-t border-dashed border-gray-200 mt-8">
            <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Advance Infrastructure Booking Only
            </h6>
            <p className="text-[9px] text-slate-400 font-bold max-w-md mx-auto mt-2 leading-relaxed">
              This document is a confirmation of advance payment for digital
              assets development. ID: {displayData.prebookingId}
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div data-html2canvas-ignore className="flex flex-col md:flex-row gap-4 pt-6 max-w-[700px] mx-auto px-3">
        <button
          onClick={() => setCurrentStep(1)}
          className="flex-1 bg-white border border-gray-200 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
        >
          <FaArrowLeft className="text-slate-400" /> New Registration
        </button>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex-[1.5] py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl ${
            isDownloading ? "bg-[#1A2B4C] opacity-70" : "bg-[#1A2B4C] hover:bg-[#15233d] text-white"
          }`}
        >
          {isDownloading ? "Generating..." : <><LuPrinter size={20} /> Download Receipt</>}
        </button>
      </div>
    </div>
  );
}