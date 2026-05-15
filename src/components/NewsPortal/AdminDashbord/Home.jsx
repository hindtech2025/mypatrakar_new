import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Home({ children }) {
  const [close, setClose] = useState(false);
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}

      {/* {close && <Sidebar isOpen={close} setIsOpen={setClose} />} */}


      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header setClose={setClose} close={close} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
