import React from "react";
// import { FaRegUser } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";

export default function ControlPanel() {
  const controlBars = [
    // {
    //   text: "Profile",
    //   icon: <FaRegUser className="icon" />,
    // },
    {
      text: "My Tracks",
      icon: <RiDashboardLine className="icon" />,
    },
  ];
  return (
    <div className="control-panel all-center-column flex-sm-column flex-row-reverse justify-content-start">
      <div className="control-bars d-sm-block all-center-column flex-sm-column flex-row w-100">
        {controlBars.map((controlBar, index) => (
          <div
            className="control-bar text-white bold all-center justify-content-sm-start d-sm-flex d-none"
            role="button"
            key={index}
          >
            {controlBar.icon}
            <span className="mb-0 ml-3 d-lg-inline d-none">
              {controlBar.text}
            </span>
          </div>
        ))}
        <div className="all-center d-sm-none d-block text-white-50">
          More feature coming soon!
        </div>
      </div>
    </div>
  );
}
