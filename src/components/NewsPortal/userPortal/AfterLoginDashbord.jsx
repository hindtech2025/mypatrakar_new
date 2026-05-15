import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewPortalCard from "./NewPortalCard";
import { GetPortalList } from "../../../api/index.js";
import { FaPlus, FaInfoCircle, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AfterLoginDashboard() {
  const [portalList, setPortalList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const showCustomerPortal = async () => {
    try {
      setIsLoading(true);
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const res = await GetPortalList(userData.userId);
      // console.log(res);
      setPortalList(res.data.response || []);
    } catch (error) {
      // console.error("Failed to fetch portal list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showCustomerPortal();
  }, []);

  // Filter portals based on search term
  const filteredPortals = portalList.filter((portal) =>
    portal.agency_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Skeleton loader count based on screen size
  const skeletonCount =
    window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                My News Portals
              </h1>
              <div className="w-52 h-1.5 bg-red-600 rounded-full mt-2"></div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search portals..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-start">
              <FaInfoCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-gray-700 font-medium">
                  Manage your news portals. Add new portals or access existing
                  ones.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Note: Android apps become available within 48 hours of
                  purchase.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(skeletonCount)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 h-64"
              >
                <Skeleton height={40} className="mb-4" />
                <Skeleton count={3} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {/* Add New Portal Card */}
            <motion.div variants={itemVariants}>
              <Link to="/portal/createportal" className="block h-full group">
                <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md border-2 border-dashed border-gray-300 hover:border-red-500 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors duration-300">
                    <FaPlus className="text-red-500 text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    New Portal
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Create a new news portal
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Portal Cards */}
            {filteredPortals.length > 0 ? (
              filteredPortals.map((user, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <NewPortalCard
                    agency_name={user?.agency_name}
                    news={user?.news}
                    package_name={user?.package}
                    package_id={user?.package_id}
                    purchase_date={user?.purchase_date}
                    purchase_status={user?.purchase_status}
                    payment_status={user?.payment_status}
                    portal_status={user?.payment_status}
                    request_status={user?.request_status}
                    purchase_id={user?.purchase_id}
                    status={user?.status}
                    users={user?.users}
                    rejected_notes={user?.rejected_notes}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
                variants={itemVariants}
              >
                <div className=" mx-auto text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    No portals found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm
                      ? "No matching portals found."
                      : "You haven't created any portals yet."}
                  </p>
                  <Link
                    to="/portal/createportal"
                    className="text-center w-full flex items-center justify-center px-2 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <FaPlus className="mr-2" />
                    Create New Portal
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
