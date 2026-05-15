
import { useState } from "react";
import Header from "./component/Header";
import { Stepper } from "./component/Stepper";
import { RegistrationForm } from "./pages/RegistrationForm";
import SecureVerification from "./pages/SecureVerification";
import BookingPayment from "./pages/BookingPayment";
import ReceiptView from "./pages/ReceiptView";
import Swal from "sweetalert2";
import { preBookingFormSubmission } from "../../api";

// API imports

const INITIAL_DATA = {
  fullName: "",
  email: "",
  phone: "",
  mediaHouse: "",
  regType: "",
  regId: "",
  country: "",
  state: "",
  city: "",
};

export default function PreBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API Response and Error States
  const [apiData, setApiData] = useState({ prebooking_id: "", otp_token: "" });
  const [recieptData, setRecieptData] = useState(null);
  const [errors, setErrors] = useState({}); // Field-wise errors store karne ke liye

  const handleClearForm = () => {
    setFormData(INITIAL_DATA);
    setErrors({});
    setCurrentStep(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Typing karte waqt error hatane ke liye
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      setIsSubmitting(true);
      setErrors({}); // Reset errors

      try {
        const response = await preBookingFormSubmission({
          fullname: formData.fullName,
          mediahouse: formData.mediaHouse,
          reg_no: formData.regId,
          reg_type: formData.regType,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          state: formData.state,
          city: formData.city,
        });
        // console.log(response);
        if (response.data && response.data.status) {
          // Success case
          setApiData({
            prebooking_id: response.data.prebooking_id,
            otp_token: response.data.otp_token,
          });
          setCurrentStep(3);
        } else {
          // ✅ Backend Validation Errors (Jaise: Phone already taken)
          if (response.data.errors) {
            setErrors(response.data.errors);
            // Ek generic alert bhi dikha dete hain
            const firstErrorKey = Object.keys(response.data.errors)[0];
            const firstErrorMessage = response.data.errors[firstErrorKey][0];

            Swal.fire({
              icon: "error",
              title: "Validation Error",
              text: firstErrorMessage,
              confirmButtonColor: "#1A2B4C",
            });
          } else {
            Swal.fire(
              "Error",
              response.data.message || "Submission failed",
              "error",
            );
          }
        }
      } catch (error) {
        // Axios errors (422, 500, etc.)
        if (error.response?.data?.errors) {
          // console.log(error);
          setErrors(error.response.data.errors);
          Swal.fire(
            "Error",
            Object.values(error.response.data.errors)[0][0],
            "error",
          );
        } else {
          Swal.fire(
            "Server Error",
            "Could not connect to the server.",
            "error",
          );
        }
      } finally {
        setIsSubmitting(false);
   
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans selection:bg-red-100 pb-20">
      <Header onClear={handleClearForm} />

      <main className="container mx-auto px-4 py-12">
        {/* HERO SECTION */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#FEE2E2] text-[#e30e0e] text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest mb-6">
            Exclusive Media Assets
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4 tracking-tight">
            App & Website Booking
          </h2>
          <p className="text-[#64748B] text-lg font-bold max-w-xl mx-auto ">
            Secure your news portal infrastructure with an advance payment{" "}
            <br className="hidden md:block" />
            of <span className=" font-bold">₹999</span>.
          </p>
        </div>

        {currentStep < 4 && <Stepper currentStep={currentStep} />}

        <div className="mt-12 transition-all duration-500">
          {/* STEP 1: Form with Errors prop */}
          {currentStep === 1 && (
            <RegistrationForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleNext}
              loading={isSubmitting}
              errors={errors}
            />
          )}

          {/* STEP 2: Verification */}
          {currentStep === 2 && (
            <SecureVerification
              handleNext={handleNextStep}
              handlePrevious={handlePrevStep}
              prebookingId={apiData.prebooking_id}
              otpToken={apiData.otp_token}
              phone={formData.phone}
            />
          )}
          {/* <SecureVerification
            handleNext={handleNextStep}
            handlePrevious={handlePrevStep}
            prebookingId={apiData.prebooking_id}
            otpToken={apiData.otp_token}
            phone={formData.phone}
          /> */}
          {/* STEP 3: Payment */}
          {currentStep === 3 && (
            <BookingPayment
              handleNextStep={handleNextStep}
              handlePrevious={handlePrevStep}
              amount={999.0}
              phone={formData.phone}
              email={formData.email}
              fullName={formData.fullName}
              country={formData.country}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              prebookingId={apiData.prebooking_id}
              setRecieptData={setRecieptData} // API Response yahan save hoga
            />
          )}

          {/* STEP 4: Final Receipt */}
          {currentStep === 4 && (
            <ReceiptView
              formData={formData}
              setCurrentStep={setCurrentStep}
              recieptData={recieptData} // Real data from payment API
            />
          )}
          {/* <ReceiptView
              formData={formData}
              setCurrentStep={setCurrentStep}
              recieptData={recieptData} // Real data from payment API
            /> */}
        </div>
      </main>
    </div>
  );
}
