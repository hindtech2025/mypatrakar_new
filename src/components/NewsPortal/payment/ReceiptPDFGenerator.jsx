import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

export default function ReceiptPDFGenerator({
  targetRef,
  fileName = "receipt.pdf",
}) {
 const generatePDF = async () => {
  if (!targetRef.current) {
    alert("Receipt content not found!");
    return;
  }

  try {
    const element = targetRef.current;
    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add extra pages if required
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
  } catch (error) {
    // console.error("PDF Error:", error);
    alert("Something went wrong while generating PDF.");
  }
};


  return (
    // <button
    //   onClick={}
    //   className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-3"
    // >
    //   Download Receipt (PDF)
    // </button>
    <button
      onClick={generatePDF}
      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-3"
    >
      <Download className="w-5 h-5" />
      <span>Download Receipt (PDF)</span>
    </button>
  );
}
