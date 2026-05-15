import React from "react"

import { useContext } from "react";
import { PaymentContext } from "../../../context/PaymentContext";
import { Link } from "react-router-dom";
import PortalDashboardAfterRequest from "../createApporWeb/portalDashboardAfterRequest";
import { AuthContext } from "../../../context/Auth-context";
export default function AddPortal() {

    const {paymentStatus}=useContext(PaymentContext);
    const auth=useContext(AuthContext);
    // const loggedin=true;
  return (
    <div>
        <section className="md:flex flex-1 items-center lg:justify-center justify-end p-4 md:p-6">
            <div className="flex  items-center justify-center  gap-6">
             {paymentStatus==='pending'   && <div className="flex-col mt-20 flex-wrap items-center justify-center gap-6">
                {/* Add New Portal Button */}
                <Link to={"/portal/createApporWeb"}>
                  <div className="p-6 border-2 h-40  lg:w-60 w-1/2   rounded-lg border-red-700 flex items-center justify-center text-5xl font-bold cursor-pointer hover:bg-red-50 transition duration-200 text-red-800 ">
                    +
                  </div>
                </Link>
                <p className="py-3 px-2 lg:text-left text-center">Create app & website request for your news portal</p> 
                </div> }   

              </div>
              {
 auth.isLogin  ? (
<Link to={'/createApporWeb'}>
<PortalDashboardAfterRequest paymentStatus={paymentStatus}/></Link>
  ):(<Link to ="/login"></Link>)
}
            </section>
    </div>
  )
}

  