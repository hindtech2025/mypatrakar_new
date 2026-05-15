
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiXCircle,
  FiShield,
  FiCheckCircle,
  FiLock,
} from "react-icons/fi"; // Added extra icons for the UI
import { ApplyCoupon, DecryptString, getPurchaseDetails } from "../../../api";
import PaymentPage from "./PaymentPage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ApplyCouponHere from "./ApplyCouponHere";
import packageCoin from "../../../assets/packageCoin.png";
import GstBox from "./GstBox";
import GstNameBox from "./GstNameBox";
export default function OrderSummary() {
  const { package_id, purchase_id, user_id } = useParams();
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [gstError, setGstError] = useState("");
  const [gstSuccess, setGstSuccess] = useState("");
  const [gstLoading, setGstLoading] = useState(false);
  const [gstApplied, setGstApplied] = useState(false);
  const [showGstForm, setShowGstForm] = useState(false);
  const [gstName, setGstName] = useState("");
  const [gstNameError, setGstNameError] = useState("");
  const [gstNameSuccess, setGstNameSuccess] = useState("");

  const [gstNameApplied, setGstNameApplied] = useState(false);
  const [ids, setIds] = useState({
    package_id: "",
    purchase_id: "",
    user_id: "",
  });
  const [packageDetail, setPackageDetail] = useState(null);
  // console.log(packageDetail);

  useEffect(() => {
    const decryptParams = async () => {
      try {
        setLoading(true);
        const [pkg, pur, usr] = await Promise.all([
          DecryptString(package_id),
          DecryptString(purchase_id),
          DecryptString(user_id),
        ]);
        setIds({
          package_id: pkg.data.response,
          purchase_id: pur.data.response,
          user_id: usr.data.response,
        });
      } catch (err) {
        // console.error("Error decrypting IDs:", err);
        setError("Invalid URL or access error.");
      } finally {
        setLoading(false);
      }
    };
    decryptParams();
  }, [package_id, purchase_id, user_id]);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const purchaseId = ids.purchase_id.includes(":")
          ? ids.purchase_id.replace(":", "")
          : ids.purchase_id;

        const res = await getPurchaseDetails(purchaseId);
        if (res.data?.data) {
          setPackageDetail(res.data.data);
        } else {
          setError("Invalid response from server.");
        }
      } catch (err) {
        // console.error("Failed to fetch package:", err);
        setError("Unable to load package details. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (ids.package_id && ids.purchase_id) fetchPackage();
  }, [ids.package_id, ids.purchase_id, couponApplied]);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value.trim());
    setError("");
    setSuccess("");
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    if (!couponCode) return setError("Enter a valid coupon code.");

    const payload = {
      purchase_id: ids.purchase_id,
      customer_id: ids.user_id,
      coupon_code: couponCode,
    };

    try {
      setCouponLoading(true);
      const res = await ApplyCoupon(payload);
      setSuccess("Coupon applied successfully!");
      setCouponApplied(true);
      setError("");
      setShowCouponForm(false);
    } catch (err) {
      const msg = err?.response?.data;
      if (msg?.status_message === "Validation Failed") {
        setError(msg?.errors?.coupon_code?.[0] || "Invalid coupon code.");
      } else {
        setError(msg?.status_message || "Coupon application failed.");
      }
      setSuccess("");
    } finally {
      setCouponLoading(false);
    }
  };

  const toggleCouponForm = () => {
    setShowCouponForm(!showCouponForm);
    setError("");
    setSuccess("");
  };

  const handleGstSubmit = (e) => {
    e.preventDefault();

    if (!gstNumber) {
      setGstError("Please enter GST number");
      return;
    }

    setGstApplied(true);
    setGstSuccess("GST number saved");
    setGstError("");
    setShowGstForm(false);
  };
  const handleGstNameSubmit = (e) => {
    e.preventDefault();

    if (!gstName.trim()) {
      setGstNameError("Please enter GST business name.");
      return;
    }

    setGstNameSuccess("GST name saved successfully!");
    setGstNameApplied(true);
    setGstNameError("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <AiOutlineLoading3Quarters className="animate-spin w-12 h-12 text-red-500" />
      </div>
    );
  }

  if (error && !packageDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <FiXCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900">Oops!</h3>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FB] flex justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ">
        {/* LEFT COLUMN: Marketing & Trust Signals */}

        <div className="flex flex-col items-start justify-center mt-10 lg:pr-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Upgrade Your Portal Access
          </h1>

          <p className="text-lg text-gray-500  leading-relaxed">
            Unlock advanced tools and premium features designed to manage and
            scale your news portal efficiently.
          </p>

          <div className="mt-10 space-y-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <FiShield className="text-red-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Secure Payment
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Payments are protected with industry-standard SSL encryption.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <FiCheckCircle className="text-red-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Premium Platform Features
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Access advanced publishing tools, analytics, and customization
                  options.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <FiCheckCircle className="text-red-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Instant Activation
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Your upgraded plan becomes active immediately after payment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Order Card */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Top Color Strip (Visual Accent) */}
          <div className="h-2 bg-gradient-to-r from-red-500 to-orange-400"></div>

          <div className="p-8">
            {/* Package Details Box */}
            {packageDetail && (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12   flex items-center justify-center">
                    {/* <span className="text-2xl"></span> */}

                    <img src={packageCoin} alt="This is a package coin" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {packageDetail?.plan_details?.package_name}
                    </p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      Yearly Subscription
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {packageDetail?.plan_details?.region !== "1" ? "₹" : "$"}
                    {packageDetail?.plan_details?.payable}
                  </p>
                  <p className="text-[10px] text-gray-400">Base Price</p>
                </div>
              </div>
            )}

            {/* Order Summary List */}
            <h2 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 text-[15px]">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  {packageDetail?.plan_details?.region !== "1" ? "₹" : "$"}
                  {packageDetail?.plan_details?.payable}
                </span>
              </div>

              {packageDetail?.discount_amount > 0 && (
                <div className="flex justify-between text-green-600 text-[15px]">
                  <span>Discount</span>
                  <span className="font-medium">
                    - {packageDetail?.plan_details?.region !== "1" ? "₹" : "$"}
                    {packageDetail?.discount_amount}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-gray-600 text-[15px]">
                <span>Tax (GST 18%)</span>
                <span className="font-medium text-gray-900">
                  {packageDetail?.plan_details?.region !== "1" ? "₹" : "$"}
                  {packageDetail?.gst_amount ?? "0"}
                </span>
              </div>
            </div>

            {/* Total Amount Divider */}
            <div className="border-t border-dashed border-gray-200 my-4"></div>

            {/* Total Amount Big Display */}
            <div className="flex justify-between items-end mb-6">
              <span className="text-lg font-bold text-gray-900 mb-1">
                Total Amount
              </span>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-red-600">
                  {packageDetail?.plan_details?.region !== "1" ? "₹" : "$"}
                  {packageDetail?.payable_amount}
                </span>
                <p className="text-[11px] text-gray-400 font-medium">
                  Includes all applicable taxes
                </p>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="mb-6">
              <ApplyCouponHere
                couponApplied={couponApplied}
                toggleCouponForm={toggleCouponForm}
                showCouponForm={showCouponForm}
                handleCouponChange={handleCouponChange}
                handleCouponSubmit={handleCouponSubmit}
                couponCode={couponCode}
                couponLoading={couponLoading}
                error={error}
                success={success}
                setCouponApplied={setCouponApplied}
                packageDetail={packageDetail}
                setCouponCode={setCouponCode}
              />
            </div>
            {/* GST number section  */}
            <div className="mb-6">
              <GstBox
                gstNumber={gstNumber}
                setGstNumber={setGstNumber}
                gstLoading={gstLoading}
                handleGstSubmit={handleGstSubmit}
                error={gstError}
                success={gstSuccess}
              />
            </div>
            {/* GST name section  */}
            {(
              <div className="mb-6">
                <GstNameBox
                  gstName={gstName}
                  setGstName={setGstName}
                  gstNameLoading={false}
                  handleGstNameSubmit={handleGstNameSubmit}
                  error={gstNameError}
                  success={gstNameSuccess}
                />
              </div>
            )}

            {/* Payment Button Component */}
            <div className="mt-">
              <PaymentPage
                amount={packageDetail?.payable_amount}
                setError={setError}
                error={error}
                purchaseId={ids.purchase_id}
                region={packageDetail?.plan_details?.region}
                user_id={ids.user_id}
                gstName={gstName}
                gstNumber={gstNumber}
              />
            </div>

            {/* Footer Terms */}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs text-center">
              <FiLock className="text-gray-300 mb-0.5" />
              <p>
                By purchasing, you agree to our{" "}
                <a
                  href="/terms-and-conditions"
                  className="text-gray-600 underline hover:text-red-600"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  className="text-gray-600 underline hover:text-red-600"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
