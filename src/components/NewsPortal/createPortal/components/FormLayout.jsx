import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function FormLayout({ children, status, handleSubmit, isLoading }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}