

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  createOrder,
  CustomerProfile,
  makePayment,
  verifyOrder,
} from "../../../api";

const PaymentPage = ({
  amount,
  region,
  user_id,
  purchaseId,
  gstName,
  gstNumber,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");

  // 🔥 CRITICAL FIXES
  const hasCreatedOrder = useRef(false);
  const isProcessingPayment = useRef(false);
  const [isRegionReady, setIsRegionReady] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const userId = user_id?.includes(":") ? user_id.split(":")[1] : user_id;
  const purchase_id = purchaseId?.includes(":")
    ? purchaseId.replace(":", "")
    : purchaseId;

  // ---------------- CHECK IF REGION IS READY ----------------
  useEffect(() => {
    if (region !== undefined && region !== null) {
      setIsRegionReady(true);
      console.log("Region ready:", region);
    }
  }, [region]);

  // ---------------- CREATE ORDER (ONLY WHEN READY) ----------------
  useEffect(() => {
    // 🔥 Wait for region to be ready
    if (!isRegionReady) {
      console.log(" Waiting for region to be ready...");
      return;
    }

    // Prevent double creation
    if (hasCreatedOrder.current) {
      console.log("⏭ Order already created, skipping...");
      return;
    }

    if (!amount || amount <= 0) {
      console.error(" Invalid amount:", amount);
      return;
    }

    const amountNum = Number(amount);
    const amountInPaise = Math.round(amountNum * 100);

    // Minimum amount check
    const minAmount = region === "0" ? 10 : 1; // ₹10 or $1
    if (amountInPaise < minAmount) {
      const minDisplay = region === "0" ? "₹10" : "$1";
      setError(
        `Minimum payment amount is ${minDisplay}. Current: ${region === "0" ? "₹" : "$"}${amount}`,
      );
      return;
    }

    const initOrder = async () => {
      try {
        hasCreatedOrder.current = true;

        const currency = region === "0" ? "INR" : "USD";

        console.log(" Creating order (ONCE):", {
          amountInPaise,
          currency,
          originalAmount: amount,
          region,
        });

        const res = await createOrder({
          amount: amount,
          currency: currency,
          receipt: `rcpt_${Date.now()}_${Math.random()}`,
          payment_capture: 1,
        });

        console.log("Order creation response:", res?.data);

        const order_id =
          res?.data?.data?.id ||
          res?.data?.id ||
          res?.data?.data?.order_id ||
          res?.data?.order_id;

        console.log(" ORDER ID:", order_id);

        if (!order_id || !order_id.startsWith("order_")) {
          throw new Error(`Invalid order id: ${order_id}`);
        }

        setOrderId(order_id);
        setError("");
      } catch (err) {
        console.error(" CREATE ORDER ERROR:", err?.response?.data || err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to initialize payment. Please refresh.",
        );
        hasCreatedOrder.current = false;
      }
    };

    initOrder();
  }, [amount, region, isRegionReady]); // ✅ All dependencies

  // ---------------- FETCH USER ----------------
  useEffect(() => {
    const getProfile = async () => {
      if (!userId) return;

      try {
        const res = await CustomerProfile({ customer_id: userId });
        const userData = res?.data?.response || {};
        setUser({
          name: userData.name || "",
          email: userData.email || "",
          mobile: userData.mobile || userData.phone || "",
        });
      } catch (err) {
        console.error("Profile fetch failed", err);
      }
    };

    getProfile();
  }, [userId]);

  // ---------------- LOAD RAZORPAY ----------------
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        resolve(false);
      };
      document.body.appendChild(script);
    });

  // ---------------- SAVE FAILED PAYMENT ----------------
  const saveFailedPayment = async (
    transactionId = null,
    orderIdParam = null,
  ) => {
    try {
      await makePayment({
        purchase_id,
        customer_id: userId,
        transection_id: transactionId,
        payment_order_id: orderIdParam || orderId,
        payment_method: "razorpay",
        gstName: gstName || "NA",
        gstNumber: gstNumber || "NA",
        status: "2",
      });
      console.log(" Failed payment saved");
    } catch (err) {
      console.error(" Failed to save payment status:", err);
    }
  };

  // ---------------- PAYMENT HANDLER ----------------
  const handlePayment = async () => {
    if (isProcessingPayment.current) {
      console.log(" Payment already in progress...");
      return;
    }

    if (!orderId) {
      setError("Order not ready. Please wait or refresh the page.");
      return;
    }

    isProcessingPayment.current = true;
    setLoading(true);
    setError("");

    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) throw new Error("Payment configuration error");

      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Payment gateway failed to load");

      const currency = region === "0" ? "INR" : "USD";
      const amountInPaise = Math.round(Number(amount) * 100);

      console.log(" Opening Razorpay:", {
        orderId,
        amount: amountInPaise,
        currency,
        hasOrderId: !!orderId,
        orderIdPrefix: orderId?.substring(0, 6),
      });

      const options = {
        key: razorpayKey,
        amount: amountInPaise,
        currency: currency,
        order_id: orderId,
        name: "MyPtrakar",
        description: "Subscription Payment",

        handler: async function (response) {
          console.log(" PAYMENT SUCCESS:", response);

          try {
            const verifyRes = await verifyOrder({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            console.log(verifyRes);
            if (verifyRes?.data?.status != "success") {
              throw new Error("Payment verification failed");
            }
            await makePayment({
              purchase_id,
              customer_id: userId,
              transection_id: response.razorpay_payment_id,
              payment_order_id: response.razorpay_order_id,
              payment_method: "razorpay",
              gstName: gstName || "NA",
              gstNumber: gstNumber || "NA",
              status: "1",
            });

            navigate("/portal/payment-reciept", {
              state: {
                purchase_id: purchase_id,
                customer_id: userId,
              },
            });
          } catch (err) {
            console.error(" VERIFY ERROR:", err);
            setError("Payment verification failed");
            await saveFailedPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
            );
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.mobile || "",
        },

        notes: {
          customer_id: userId,
          purchase_id: purchase_id,
          amount: amount,
          timestamp: Date.now(),
        },

        modal: {
          ondismiss: async () => {
            console.log("Payment modal closed by user");
            setError("Payment cancelled");
            await saveFailedPayment(null, orderId);
          },
        },

        theme: {
          color: "#ef4444",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async (response) => {
        console.error(" PAYMENT FAILED:", response.error);
        const errorMsg = response?.error?.description || "Payment failed";
        setError(errorMsg);
        await saveFailedPayment(
          response?.error?.metadata?.payment_id || null,
          response?.error?.metadata?.order_id || orderId,
        );
      });

      rzp.open();
    } catch (err) {
      console.error(" HANDLE PAYMENT ERROR:", err);
      setError(err.message || "Failed to initiate payment");
      await saveFailedPayment(null, orderId);
    } finally {
      setLoading(false);
      isProcessingPayment.current = false;
    }
  };

  // ---------------- UI ----------------
  return (
    <div style={styles.wrapper}>
      {error && (
        <div style={styles.errorBox}>
          
          <span>{error}</span>
          <button onClick={() => setError("")} style={styles.closeButton}>
            ✕
          </button>
        </div>
      )}

      <div style={styles.paymentCard}>
        <div style={styles.amountDisplay}>
          <span style={styles.amountLabel}>Total Amount</span>
          <span style={styles.amountValue}>
            {region === "0" ? "₹" : "$"} {amount}
          </span>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading || !orderId || !isRegionReady}
          style={
            loading || !orderId || !isRegionReady
              ? styles.buttonDisabled
              : styles.button
          }
        >
          {!isRegionReady
            ? " Loading..."
            : !orderId
              ? " Initializing..."
              : loading
                ? " Processing..."
                : ` Pay ${region === "0" ? "₹" : "$"}${amount}`}
        </button>

        <div style={styles.securityNote}>
      
          <span>Secure payment by Razorpay</span>
        </div>
      </div>
    </div>
  );
};

// Styles remain the same...
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1rem",
    maxWidth: "500px",
    margin: "0 auto",
  },
  paymentCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  amountDisplay: {
    textAlign: "center",
    padding: "20px",
    background: "#f9fafb",
    borderRadius: "12px",
    marginBottom: "24px",
  },
  amountLabel: {
    display: "block",
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "8px",
  },
  amountValue: {
    display: "block",
    fontSize: "36px",
    fontWeight: "700",
    color: "#1f2937",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid #fecaca",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#991b1b",
    cursor: "pointer",
    marginLeft: "auto",
    fontSize: "18px",
  },
  button: {
    width: "100%",
    background: "#ef4444",
    color: "white",
    padding: "14px 20px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "16px",
  },
  buttonDisabled: {
    width: "100%",
    background: "#e5e7eb",
    color: "#9ca3af",
    padding: "14px 20px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "not-allowed",
    marginBottom: "16px",
  },
  securityNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "12px",
    color: "#6b7280",
  },
};

export default PaymentPage;
