import axios from "axios";
import Swal from "sweetalert2";
import { showError } from "../utils/swal";

const API = axios.create({
  // baseURL: "/api",  // Correct concatenation
  baseURL: import.meta.env.VITE_WEBSITE_BASE_API_URL, // Correct concatenation
  timeout: 20000,
});
const AuthToken = import.meta.env.VITE_AUTH_TOKEN;
// get api
// ✅ RESPONSE INTERCEPTOR (GLOBAL ERROR HANDLER)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 Backend validation error
    if (error?.response?.status === 422) {
      const errors = error.response.data?.errors;

      if (errors) {
        const messages = Object.values(errors).flat().join("<br/>");

        Swal.fire({
          icon: "warning",
          title: "Please fix the following",
          html: messages,
        });
      }
      return Promise.reject(error);
    }
console.log(error);
    // 🔐 Unauthorized
    if (error?.response?.status === 401) {
      showError("Session expired", "Please login again");
      return Promise.reject(error);
    }

    // 💥 Server error
    if (error?.response?.status >= 500) {
      showError("Server error", "Please try again later");
      return Promise.reject(error);
    }

    // 🌐 Network / unknown
    showError(
      "Something went wrong",
      error.message || "Please check your internet connection",
    );

    return Promise.reject(error);
  },
);

export const GetRepoters = () => async () =>
  await API.post(
    "/reporters-uses-my-patrakar",
    {},
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

export const getLanguages = async () => {
  return await API.get("/recommded-language", {
    headers: {
      Authorization: AuthToken,
    },
  });
};

export const GetFeature = async () =>
  await API.post(
    "/features-in-my-patrakar",
    {},
    {
      headers: {
        Authorization: AuthToken,
      },
      // withCredentials:true
    },
  );

export const DownloadBochure = async () =>
  await API.post(
    "/download-brochure",
    {},
    {
      responseType: "blob",
      headers: {
        Authorization: AuthToken,
      },
    },
  );

export const GetPriceDetails = async () =>
  await API.post(
    "/pricing-in-my-patrakar",
    {},
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );
export const DemoGetPriceDetails = async () =>
  await API.get("/demo-package", {
    headers: {
      Authorization: AuthToken,
    },
  });

// export const GetFeature = async () => await API.get("/features-in-my-patrakar");
export const OrderDetails = async () =>
  await API.get("/pricing-in-my-patrakar", {
    headers: {
      Authorization: AuthToken,
    },
  });
export const GetResources = async () =>
  await API.get("/resources-in-my-patrakar", {
    headers: {
      Authorization: AuthToken,
    },
  });

export const ContactDetails = async () =>
  await API.get("/contact", {
    headers: {
      Authorization: AuthToken,
    },
  });
export const CustomerProfile = async (id) =>
  await API.post(
    `/get-customer-profile`,
    { customer_id: id },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );
export const GetPortalList = async (customer_id) =>
  await API.post(
    `/get-portal-list`,
    { customer_id: customer_id },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

// export const PaymentDetails = async () => await API.get("/payment-details");
export const BlogCategoryId = async () =>
  await API.get("/blog-category", {
    headers: {
      Authorization: AuthToken,
    },
  });
export const FindBlogs = async (blog_category) =>
  await API.post("/blog-by-category", blog_category, {
    headers: {
      Authorization: AuthToken,
    },
  });
export const PrivacyAndPolicy = async () =>
  await API.get("/privacy-policy", {
    headers: {
      Authorization: AuthToken,
    },
  });
export const Terms_Conditions = async () =>
  await API.get("/term-condition", {
    headers: {
      Authorization: AuthToken,
    },
  });
// post api
export const ContactSupport = async (data) =>
  await API.post("/contact-support", data, {
    headers: {
      Authorization: AuthToken,
    },
  });

export const requestCall = async (data) =>
  await API.post("/request-call", data, {
    headers: {
      Authorization: AuthToken,
    },
  });

//for login
export const LoginSendOtp = async (data) =>
  await API.post("/auth-login", data, {
    headers: {
      Authorization: AuthToken,
    },
  });

export const VerifyLoginOtp = async (data) =>
  await API.post("/auth-verify", data, {
    headers: {
      Authorization: AuthToken,
    },
  });

//for signup
export const SignupSendOtp = async (data) =>
  await API.post("/send-signup-otp", data, {
    headers: {
      Authorization: AuthToken,
    },
  });

export const VerifySignUpOtp = async (data) =>
  await API.post("/verify-signup-otp", data, {
    headers: {
      Authorization: AuthToken,
    },
  });
// for logout
export const Logout = async (customer_id) =>
  await API.post("/auth-logout", customer_id, {
    headers: {
      Authorization: AuthToken,
    },
  });

export const PackageByRegion = async (region) =>
  await API.post("/package-by-region", region, {
    headers: {
      Authorization: AuthToken,
    },
  });
export const CreateNewPortal = async (data) =>
  await API.post("/create-portal", data, {
    headers: {
      Authorization: AuthToken,
    },
  });
export const ApplyCoupon = async (data) =>
  await API.post("/apply-coupon", data, {
    headers: {
      Authorization: AuthToken,
    },
  });
// export const PaymentStatus = async () =>
//   await API.post("/make-payment", {
//     headers: {
//       Authorization: AuthToken,
//     },
//   });
export const PaymentMethod = async (data) =>
  await API.post("/payment/payment-method", data); //customer card details

export const CreateAppOrWebCustomer = async (data) => {
  console.log(data);
  // return await API.post("/create-app-or-web", data, {
  return await API.post("/create-app-or-web", data, {
    headers: {
      Authorization: AuthToken,
    },
  });
};

// encrypt string or ids
export const EncryptString = async (id) =>
  await API.get(`/encrypt-string/:${id}`, {
    headers: {
      Authorization: AuthToken,
    },
  });

// decrypting string or ids
export const DecryptString = async (id) =>
  await API.get(`/decrypt-string/:${id}`, {
    headers: {
      Authorization: AuthToken,
    },
  });

export const getCountryCode = async (data) =>
  await API.post(
    `/country-code`,
    { ...data },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );
// get states with the help of country
export const getSates = async () =>
  await API.post(
    `/getStates`,
    { name: "India" },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

// get cities with the help of state
export const getCitiesBySates = async (name) =>
  await API.post(
    `/getCities`,
    {
      name: name,
    },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

// get package tetails selected by user
export const getPurchaseDetails = async (purchase_id) =>
  await API.post(
    `/purchased-details`,
    {
      purchase_id: purchase_id,
    },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

export const makePayment = async (data) =>
  await API.post(`/make-payment`, data, {
    headers: {
      Authorization: AuthToken,
    },
  });

export const AdminPaymentRecieptDetails = async (data) =>
  await API.post(
    `/admin-invoice-detail`,
    { ...data },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );
export const customerPaymentRecieptDetails = async (data) =>
  await API.post(
    `/customer-invoice_detail`,
    { ...data },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

export const preBookingFormSubmission = async (data) =>
  await API.post(
    `/prebooking`,
    { ...data },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

export const preBookingVerifyOTP = async (data) =>
  await API.post(
    `/prebook-otp-verify`,
    { ...data },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

export const preBookingPayment = async (data) =>
  await API.post(
    `/prebook-payment`,
    { ...data },
    {
      headers: {
        Authorization: AuthToken,
      },
    },
  );

export const webDemo = async (data) =>
  await API.post("/web-demo", data, {
    headers: {
      Authorization: AuthToken,
    },
  });

export const checkDomainAvailability = async (data) =>
  await API.post("/check-doamin", data, {
    headers: {
      Authorization: AuthToken,
    },
  });

export const createOrder = async (data) =>
  await API.post("/create-order", data, {
    headers: {
      Authorization: AuthToken,
    },
  });
export const verifyOrder = async (data) =>
  await API.post("/verify-payment", data, {
    headers: {
      Authorization: AuthToken,
    },
  });
