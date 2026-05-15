import React, { useRef } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Calendar,
  CreditCard,
  Tag,
  Link as LinkIcon,
  FileBadge2,
  User,
  Mail,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import ReceiptPDFGenerator from "./ReceiptPDFGenerator";
export default function PaymentReceiptScreen() {
  const receiptRef = useRef();

  // --- Data Extracted from Uploaded Screenshot & Context ---
  const PAYMENT_DETAILS = {
    // Financial Details (Extracted from Checkout screenshot)
    totalAmount: 14145.84, // ₹14,145.84
    basePrice: 11988.0, // ₹11,988.00
    taxAmount: 2157.84, // ₹2,157.84 (GST 18%)

    // Plan Details (Extracted from Checkout screenshot)
    planName: "My Patrakar Premium",
    duration: "Yearly Subscription Plan",

    // Payer Details (Email extracted from top-right corner of screenshot)
    userName: "HindWebMac1", // Inferred from Google Account name
    userEmail: "hindwebmac1@gmail.com",

    // Transaction Details (Placeholders consistent with the style)
    transactionId: "TXN-2025-5G78X2A9",
    purchaseId: "PCH-12052025-001",
    date: "December 5, 2025",
    time: "07:28 PM IST",
    paymentMethod: "UPI via GPay", // Realistic Placeholder
    status: "Successful",
  };

  const COMPANY_DETAILS = {
    name: "Patrakar Digital Pvt. Ltd.",
    supportEmail: "support@patrakar.com",
  };

  /**
   * Helper component to display a single detail row on the slip.
   * Uses consistent typography and spacing.
   * @param {{label: string, value: string, icon: React.ReactNode}} props
   */
  const DetailRow = ({ label, value, icon }) => (
    <div className="flex items-center justify-between py-2 text-slate-500 text-sm">
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-slate-900 font-medium">{value}</span>
    </div>
  );

  // --- Handler for the Continue Button ---
  const handleBackToDashboard = () => {
    // Placeholder for navigation logic
    // console.log("Navigating back to Dashboard...");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="max-w-xl w-full">
        {/* Payment Slip Card Container */}
        <div className="relative" ref={receiptRef}>
          {/* Decorative Top Border Gradient (Matches Checkout Card) */}
          <div className="absolute -top-[4px] left-0 right-0 h-[4px] bg-gradient-to-r from-rose-400 to-orange-400 rounded-t-xl z-10 mx-[1px]"></div>

          <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden relative z-0">
            <div className="p-8 space-y-8">
              {/* HEADER: Title, Icon, and Date */}
              <div className="text-center space-y-2 border-b border-slate-100 pb-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Payment Receipt
                </h1>
                <p className="text-sm text-slate-500 font-medium flex justify-center items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {`${PAYMENT_DETAILS.date} at ${PAYMENT_DETAILS.time}`}
                </p>
              </div>

              {/* SECTION 1: Total Amount Paid */}
              <div className="text-center space-y-1">
                <p className="text-slate-500 font-medium text-lg">
                  Total Amount Paid
                </p>
                <div className="text-6xl font-extrabold text-rose-600 tracking-tight">
                  ₹
                  {PAYMENT_DETAILS.totalAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>

              {/* SECTION 2: Payer Details */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-3">
                  Payer Details
                </h3>
                <DetailRow
                  label="Name"
                  value={PAYMENT_DETAILS.userName}
                  icon={<User className="w-4 h-4 text-slate-400" />}
                />
                <DetailRow
                  label="Email"
                  value={PAYMENT_DETAILS.userEmail}
                  icon={<Mail className="w-4 h-4 text-slate-400" />}
                />
              </div>

              {/* SECTION 3: Payment Details */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-3">
                  Payment Details
                </h3>
                <DetailRow
                  label="Transaction ID"
                  value={PAYMENT_DETAILS.transactionId}
                  icon={<FileText className="w-4 h-4 text-slate-400" />}
                />
                <DetailRow
                  label="Purchase ID"
                  value={PAYMENT_DETAILS.purchaseId}
                  icon={<LinkIcon className="w-4 h-4 text-slate-400" />}
                />
                <DetailRow
                  label="Payment Method"
                  value={PAYMENT_DETAILS.paymentMethod}
                  icon={<CreditCard className="w-4 h-4 text-slate-400" />}
                />
                <DetailRow
                  label="Status"
                  value={PAYMENT_DETAILS.status}
                  icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                />
              </div>

              {/* SECTION 4: Plan & Invoice Summary */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-3">
                  Subscription Details
                </h3>
                <DetailRow
                  label="Plan Name"
                  value={PAYMENT_DETAILS.planName}
                  icon={<Building2 className="w-4 h-4 text-slate-400" />}
                />
                <DetailRow
                  label="Duration"
                  value={PAYMENT_DETAILS.duration}
                  icon={<Tag className="w-4 h-4 text-slate-400" />}
                />

                <div className="h-px bg-slate-100 my-4"></div>

                {/* Invoice Breakdown */}
                <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-3">
                  Invoice Breakdown
                </h4>
                <DetailRow
                  label="Base Price"
                  value={`₹${PAYMENT_DETAILS.basePrice.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}`}
                  icon={<Tag className="w-4 h-4 text-slate-400" />}
                />
                <DetailRow
                  label="Tax (GST 18%)"
                  value={`₹${PAYMENT_DETAILS.taxAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}`}
                  icon={<FileBadge2 className="w-4 h-4 text-slate-400" />}
                />

                <div className="h-px bg-slate-100 my-4"></div>
                <div className="flex justify-between items-center text-xl font-bold text-slate-900">
                  <span>Final Amount</span>
                  <span className="text-rose-600">
                    ₹
                    {PAYMENT_DETAILS.totalAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-8 pt-6 bg-slate-50 border-t border-slate-100 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-700">
                {COMPANY_DETAILS.name}
              </p>
              <p className="text-xs text-slate-500">
                For support, email us at{" "}
                <a
                  href={`mailto:${COMPANY_DETAILS.supportEmail}`}
                  className="text-rose-600 hover:underline"
                >
                  {COMPANY_DETAILS.supportEmail}
                </a>
              </p>
              <p className="text-xs text-slate-400 italic pt-2">
                This is an auto-generated receipt and is valid without a
                signature.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          {/* Download Receipt Button (Primary) */}

          <ReceiptPDFGenerator
            targetRef={receiptRef}
            fileName={`Receipt-${Date.now()}.pdf`}
          />
          {/* Back to Dashboard Button (Secondary) */}
          <button
            onClick={handleBackToDashboard}
            className="w-full bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 py-4 rounded-xl font-bold text-lg transition-colors active:scale-[0.99] flex items-center justify-center gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>
              <Link to={"/portal"}>Back to Dashboard</Link>
            </span>
          </button>

          <button
            onClick={handleBackToDashboard}
            className="w-full bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 py-4 rounded-xl font-bold text-lg transition-colors active:scale-[0.99] flex items-center justify-center gap-3"
          >
            <span>
              <Link to={"/portal/createAppOrWeb"}>Create your App or Web</Link>
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
