import { Link } from "react-router-dom";
import logo from "../../../assets/LG1.svg";

export default function Header({ onClear }) {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link to={"/"}>
        <div className="">
          <img src={logo} alt="mypatrakar logo " className="w-48 sm:w-48 md:w-48 lg:w-48 xl:w-52 object-contain"/>
        </div>
        </Link>
        
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button
          onClick={onClear}
          className="text-[10px] bg-gray-100 py-2 px-4  hover:bg-gray-200 rounded-lg font-extrabold text-slate-400 hover:text-slate-500 transition-colors uppercase tracking-widest"
        >
          Clear Form
        </button>
        <div className="h-4 w-[1px] bg-gray-200 hidden md:block"></div>
        <button className="text-[10px]  text-slate-400 uppercase tracking-widest  font-extrabold hidden md:block">
          Digital Infrastructure Booking
        </button>
      </div>
    </nav>
  );
}
