import React from "react"

import { Link } from "react-router-dom";
import { users } from "../../Authentication/users";
export default function PortalDashboardAfterRequest({ paymentStatus }) {
  return (
    <>
      <div className="lg:p-6 p-2 border-2 h-40  w-60     rounded-lg border-red-700   cursor-pointer    ">
        {users.map((user, index) => {
          return (
            <div key={index}>
              <div>
                <p className="text-black font-semibold  text-sm text-left">
                  {/* newsAgencyName  show here */}
                  {"Daily Bihar Live TV"}
                </p>
                {/* <p className="text-gray-400 text-xs  font-medium  text-left">
                  date of lunching app and web
                  { Date()}
                </p> */}
              </div>
              {paymentStatus === "pending" ? (
                <p className={`text-center text-xs  my-1 text-red-700 font-medium `}>
                  App Status : Active in 48 Hours
                </p>
              ) : (
                <p className={`text-center text-xs my-1 text-green-700 font-medium `}>
                  App Status : Active
                </p>
              )}
              {paymentStatus === "pending" && (
                <Link to={`/portal/payment${}`}>
                  <div className="flex items-center justify-center  lg:mt-10 mt-5">
                    <p className="text-black font-bold lg:text-sm text-xs hover:text-red-700">
                      Payment Status -
                      <span className="text-red-600 ">{paymentStatus}</span>
                    </p>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
