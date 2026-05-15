
import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/Auth-context";
import { useSessionStorage } from "../../../hooks/sessionStorage";
import { EncryptString } from "../../../api";
import { FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";

// Status badge styles
const STATUS_COLOR_MAP = {
  created: "text-green-600 bg-green-100",
  pending: "text-yellow-600 bg-yellow-100",
  rejected: "text-red-600 bg-red-100",
};

const getStatusClass = (status) =>
  STATUS_COLOR_MAP[status?.toLowerCase()] || "text-gray-600 bg-gray-100";

export default function NewPortalCard({
  agency_name,
  news = 0,
  users = 0,
  package_name,
  package_id,
  purchase_id,
  purchase_date,
  status,
  request_status,
  purchase_status,
  payment_status,
  rejected_notes,
}) {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { setSessionData, getSessionData } = useSessionStorage();

  // Extract user ID safely from session
  const userId = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("userData"))?.userId || null;
    } catch {
      return null;
    }
  })();

  const isRejected = request_status.toLowerCase() === "rejected";
  const isPending = request_status.toLowerCase() === "pending";
  const isPurchaseCompleted =
    purchase_status?.toLowerCase() !== "pending" &&
    payment_status?.toLowerCase() !== "pending";

  // Encrypt params for secure navigation
  const encryptParams = useCallback(async () => {
    if (!userId) throw new Error("User not logged in.");

    try {
      const [pkg, pur, usr] = await Promise.all([
        EncryptString(package_id),
        EncryptString(purchase_id),
        EncryptString(userId),
      ]);

      return {
        package_id: pkg.data.response,
        purchase_id: pur.data.response,
        user_id: usr.data.response,
      };
    } catch (err) {
      // console.error("Encryption failed:", err);
      throw new Error("Failed to process your request. Please try again.");
    }
  }, [package_id, purchase_id, userId]);

  // Handle CTA click
  const handleOpenDashboard = useCallback(async () => {
    try {
      if (!userId) {
        navigate("/login");
        return;
      }

      const encryptedIds = await encryptParams();
      const sessionExists = getSessionData("packageDetails");

      if (!sessionExists) {
        setSessionData("packageDetails", {
          purchaseId: encryptedIds.purchase_id,
          packageId: encryptedIds.package_id,
          userId: encryptedIds.user_id,
        });
      }

      const reqStatus = request_status?.toLowerCase();

      if (reqStatus === "rejected") {
        return navigate("/portal/createAppOrWeb");
      }

      if (reqStatus === "pending") {
        return isPurchaseCompleted
          ? navigate("/portal/createAppOrWeb")
          : navigate(
              `/portal/payment/${encryptedIds.package_id}/${encryptedIds.purchase_id}/${encryptedIds.user_id}`
            );
      }

      // If created or others
      toast.success("Your dashboard will be delivered within 48 hours.");
    } catch (error) {
      // console.error("Navigation error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  }, [
    userId,
    encryptParams,
    getSessionData,
    setSessionData,
    isPurchaseCompleted,
    navigate,
    request_status,
  ]);

  // --- UI: Label & Button Styling Logic ---

  // Button label
  let buttonLabel = "Make Payment";
  if (isPurchaseCompleted) {
    buttonLabel = isPending || isRejected ? "Create Portal request" : "Open Dashboard";
  }

  // Button styling
  let buttonClass = "border-yellow-200 text-red-600 hover:bg-yellow-50";
  if (isPurchaseCompleted) {
    buttonClass = isRejected||isPending
      ? "border-red-600 text-red-600 hover:bg-red-50"
      : "border-green-600 text-green-600 hover:bg-green-50";
  }

  // --- Render ---
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      
      {/* Status Badge */}
      <div className={`${getStatusClass(request_status)} text-xs font-medium px-2 py-1 rounded-full inline-block mb-4 self-start`}>
        {request_status || "N/A"}
      </div>

      {/* Portal Name */}
      <h3
        className="text-xl font-bold text-gray-800 mb-2 line-clamp-2"
        title={agency_name}
      >
        {agency_name || "Unnamed Portal"}
      </h3>

      {/* Package Info */}
      {package_name && (
        <p className="text-sm text-gray-500 mb-1">
          Package: <span className="font-medium">{package_name}</span>
        </p>
      )}

      {/* Purchase Date */}
      {purchase_date && (
        <p className="text-xs text-gray-400 mb-4">
          Since {new Date(purchase_date).toLocaleDateString()}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 mt-auto">
        <div>
          <span className="font-semibold">{news}</span> News
        </div>
        <div>
          <span className="font-semibold">{users}</span> Users
        </div>
      </div>

      {/* Rejection Note */}
      {isRejected && rejected_notes && (
        <p className="py-3 px-2 text-red-600 bg-red-50 text-sm rounded mb-4">
          {rejected_notes}
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem quod nesciunt voluptas beatae deserunt voluptates fugit at, ad laborum dicta modi, recusandae itaque, ratione placeat alias eligendi. Ipsum, cumque consequatur? */}
          
        </p>
      )}

      {/* CTA Button */}
      <button
        onClick={handleOpenDashboard}
        className={`mt-auto w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-lg font-medium transition-colors duration-200 ${buttonClass}`}
      >
        {buttonLabel}
        <FiArrowRight className="text-lg" />
      </button>
    </div>
  );
}
