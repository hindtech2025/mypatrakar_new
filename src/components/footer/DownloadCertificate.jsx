import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DownloadCertificate = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email.");
      return;
    }

    if (!validateEmail(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/certificate/download",
        { email },
        { responseType: "blob" } // Important for file downloads
      );

      // Create PDF download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${email}_certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Certificate downloaded successfully!");
    } catch (err) {
      if (err.response && err.response.data instanceof Blob) {
        // Convert error blob to JSON
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result);
            toast.error(errorData.error || "An error occurred.");
          } catch (parseError) {
            toast.error("Unexpected error occurred.");
          }
        };
        reader.readAsText(err.response.data);
      } else {
        toast.error("Failed to download certificate.");
      }
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-48 mb-28 p-6 bg-white rounded shadow-md select-none">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Download Your Certificate
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-2"
        />

        <button
          type="submit"
          className={`w-full p-3 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Download Certificate"}
        </button>
      </form>
    </div>
  );
};

export default DownloadCertificate;
