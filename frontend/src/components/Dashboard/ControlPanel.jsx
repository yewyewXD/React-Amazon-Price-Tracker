import React from "react";
import { FaRegUser } from "react-icons/fa";
import { RiFileList2Line, RiDashboardLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function ControlPanel() {
  const controlBars = [
    // {
    //   text: "Profile",
    //   icon: <FaRegUser className="icon" />,
    // },
    {
      text: "My Tracks",
      icon: <RiDashboardLine className="icon mx-2" />,
    },
    // {
    //   text: "Tracks",
    //   icon: <RiFileList2Line className="icon" />,
    // },
  ];
  return (
    <div className="control-panel all-center-column flex-sm-column flex-row-reverse justify-content-start">
      <div className="control-bars d-sm-block all-center-column flex-sm-column flex-row w-100">
        {controlBars.map((controlBar, index) => (
          <div
            className="control-bar text-white bold py-3 all-center"
            role="button"
            key={index}
          >
            {controlBar.icon}
            <span className="mb-0 mx-2 d-lg-inline d-none">
              {controlBar.text}
            </span>
          </div>
        ))}
      </div>

      {/* temporary */}
      <div className="control-bar text-white bold py-3 all-center text-white-50">
        More feature coming soon!
      </div>

      <div className="control-bar text-white bold py-3 all-center text-white-50">
        Logout
      </div>
    </div>
  );
}
