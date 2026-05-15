import { AdminPaymentRecieptDetails, customerPaymentRecieptDetails } from "../../../../../api";

export const fetchAllData = async (purchaseId) => {
  if (!purchaseId) {
    throw new Error("Purchase ID is required");
  }

  try {
    // 🔹 Admin / Seller Invoice Details
    const sellerRes = await AdminPaymentRecieptDetails({
      purchase_id: purchaseId,
    });
// console.log(sellerRes)
    if (!sellerRes?.status) {
      throw new Error(
        sellerRes?.data?.status_message ||
          "Failed to fetch admin invoice details",
      );
    }

    // 🔹 Customer Invoice Details
    const customerRes = await customerPaymentRecieptDetails({
      purchase_id: purchaseId,
    });


    if (!customerRes?.status) {
      throw new Error(
        customerRes?.data?.status_message ||
          "Failed to fetch customer invoice details",
      );
    }

    return {
      sellerData: sellerRes.data.response, // admin side
      customerData: customerRes.data.data, // customer side
    };
  } catch (error) {
    console.log("test")
    throw error;

  }
};
