import React from "react";
import { FiCalendar, FiUsers, FiFileText } from "react-icons/fi";
import { RiVipCrownLine } from "react-icons/ri";

const UserCard = ({ user,onMouseLeave }) => {
  const { agency_name, logo="https://i.pinimg.com/736x/31/9c/66/319c6690094328792031d3d278c2f32a.jpg", package: packageName, purchase_date, news, users } = user;

  // Format date to be more readable
  const formattedDate = new Date(purchase_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100" onMouseLeave={onMouseLeave}>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
        <div className="flex items-center">
          {/* Agency Logo with nice border effect */}
          <div className="relative">
            <img
              src={logo}
              alt={`${agency_name} Logo`}
              className="w-16 h-16 rounded-full object-cover border-4 border-white/80 shadow-md"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true';
              }}
            />
            <div className="absolute -bottom-1 -right-1 bg-red-100 rounded-full p-1 shadow-sm">
              <RiVipCrownLine className="text-red-600 w-4 h-4" />
            </div>
          </div>

          {/* Agency Name */}
          <div className="ml-4">
            <h3 className="text-lg font-bold text-white line-clamp-1">{agency_name}</h3>
            <span className="inline-block mt-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
              {packageName || 'Basic Plan'}
            </span>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col items-center">
            <div className="bg-red-100/50 p-2 rounded-full mb-1">
              <FiFileText className="text-red-600 w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500">News</span>
            <span className="font-bold text-gray-800">{news || 0}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-green-100/50 p-2 rounded-full mb-1">
              <FiUsers className="text-green-600 w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500">Users</span>
            <span className="font-bold text-gray-800">{users || 0}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-purple-100/50 p-2 rounded-full mb-1">
              <FiCalendar className="text-purple-600 w-5 h-5" />
            </div>
            <span className="text-xs text-gray-500">Since</span>
            <span className="font-bold text-gray-800 text-sm">{formattedDate}</span>
          </div>
        </div>

     

        {/* View Button */}
        {/* <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center">
          View Dashboard
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default UserCard;