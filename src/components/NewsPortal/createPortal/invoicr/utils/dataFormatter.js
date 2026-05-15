import { convertAmountToWords } from "./amountConverter";


export const formatCombinedData = (sellerApiData, customerApiData,customerId) => {
  // Calculate GST breakdown
  const planPrice = parseFloat(customerApiData.plan_price) || 0;
  const discountAmount = parseFloat(customerApiData.discount_amt) || 0;
  const gstAmount = parseFloat(customerApiData.gst_amt) || 0;
  const payableAmount = parseFloat(customerApiData.payable) || 0;
  
  // Calculate taxable amount (plan price - discount)
  const taxableAmount = planPrice - discountAmount;
  
  // Split GST into CGST and SGST (9% each)
  const cgstAmount = gstAmount / 2;
  const sgstAmount = gstAmount / 2;
  
  // Format invoice date
  const purchaseDate = customerApiData.purchase_date 
    ? customerApiData.purchase_date.split(' ')[0]
    : new Date().toISOString().split('T')[0];
  
  // Generate invoice number
  const invoicePrefix = sellerApiData.invoice_prefix || "MPTR";
  const invoiceNo = customerApiData.invoice_no || `${invoicePrefix}/${customerApiData.purchase_id || "000"}`;

  return {
    invoiceNo: invoiceNo,
    invoiceDate: purchaseDate,
    orderId: customerApiData.payment_order_id || customerApiData.purchase_id || "N/A",
    paymentMethod: customerApiData.payment_methode 
      ? customerApiData.payment_methode.charAt(0).toUpperCase() + customerApiData.payment_methode.slice(1)
      : "Online Payment",
    buyer: {
      name: customerApiData.customer_name || "Customer Name",
      email: customerApiData.customer_email || "customer@example.com",
      mobile: customerApiData.customer_mobile || "+91 9876543210",
      planName: customerApiData.package_name || "Premium Subscription",
      gstin: customerApiData.gstNumber || "GSTIN-NOT-PROVIDED",
      gstName: customerApiData.gstName || "Customer Business Name",
      customer_id:customerId
    },
    item: {
      name: customerApiData.package_name || "Digital Subscription Service",
      rate: planPrice.toFixed(2),
      taxable: taxableAmount.toFixed(2),
      cgst: cgstAmount.toFixed(2),
      sgst: sgstAmount.toFixed(2),
      total: payableAmount.toFixed(2),
    },
    discount: {
      code: "DISCOUNT",
      amount: discountAmount.toFixed(2),
      total: discountAmount.toFixed(2),
    },
    gstSummary: {
      taxable: taxableAmount.toFixed(2),
      cgst: cgstAmount.toFixed(2),
      sgst: sgstAmount.toFixed(2),
      total: gstAmount.toFixed(2),
    },
    totals: {
      subtotal: planPrice.toFixed(2),
      discount: discountAmount.toFixed(2),
      tax: gstAmount.toFixed(2),
      final: payableAmount.toFixed(2),
      inWords: convertAmountToWords(payableAmount),
    },
    contact: sellerApiData.support_email || sellerApiData.support_phone || "N/A",
    seller: {
      businessName: sellerApiData.business_name || "My Patrakar",
      ownerName: sellerApiData.owner_name || "Ankit Sonkar",
      gstin: sellerApiData.gstin_number || "09MKUPS1103E2ZR",
      pan: sellerApiData.pan_number || "FGNPM2312P",
      address: sellerApiData.business_address || "41-A, Krishna Vihar, Near Takrohi, Indira Nagar, Lucknow, UP – 226016",
      state: sellerApiData.state_name || "Uttar Pradesh",
      city: sellerApiData.city_name || "Lucknow",
      pincode: sellerApiData.pincode || "226016",
      supportEmail: sellerApiData.support_email || "mypatrakarsupport@gmail.com",
      supportPhone: sellerApiData.support_phone || "1309387814",
      website: sellerApiData.website_url || "https://mypatrakar.com/",
      logo_url:sellerApiData.logo_url
    },
    bank: {
      accountHolder: sellerApiData.bank_account_holder || "Ankit Sonkar",
      bankName: sellerApiData.bank_name || "Bank Of India",
      accountNumber: sellerApiData.bank_account_number || "12550100012009",
      ifsc: sellerApiData.bank_ifsc || "BARGOPASSAR",
      branch: sellerApiData.bank_branch || "Munshi Pulia Lucknow",
      upiId: sellerApiData.upi_id || "mypatrakar@upi"
    },
    hsnSac: sellerApiData.default_hsn_sac || "998431",
    taxRate: customerApiData.gst_rate || sellerApiData.default_tax_rate || 18
  };
};