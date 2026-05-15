import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DownloadCertificate from "./DownloadCertificate";

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    college: "",
    course: "",
    semester: "",
    program: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    if (!formData.college) newErrors.college = "Please select your college.";
    if (!formData.course) newErrors.course = "Please select your course.";
    if (!formData.semester) newErrors.semester = "Please select your semester.";
    if (!formData.program) newErrors.program = "Please select your program.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setServerError("");

    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post("http://localhost:5000/api/certificate/register", formData);
        toast.success("Student registered successfully!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          college: "",
          course: "",
          semester: "",
          program: "",
        });
        setErrors({});
      } catch (error) {
        const msg =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        setServerError(msg);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 my-28 border-t bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Register for Certificate
      </h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            maxLength={10}
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>

        {/* Dropdowns */}
        {[
          { name: "college", label: "--Select College--", options: ["IIT Kanpur", "IIT Delhi", "IIT Bombay", "IIT Madras", "IIT Kharagpur"] },
          { name: "semester", label: "--Select Semester--", options: ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"] },
          { name: "course", label: "--Select Course--", options: ["B.Tech CS IT", "B.Tech Electrical", "B.Tech Mechanical", "B.Tech Civil", "B.Tech Electronics"] },
          { name: "program", label: "--Select Program--", options: ["Summer/Industrial Training", "Winter/Industrial Training", "ApperenticShip Program", "UI/UX Designing Course", "Prompt Engineering Course", "Others"] }
        ].map(({ name, label, options }) => (
          <div key={name} className="mb-4">
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">{label}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
        >
          Register Student
        </button>
      </form>
      {/* <DownloadCertificate/> */}
    </div>
  );
};

export default CertificateForm;
