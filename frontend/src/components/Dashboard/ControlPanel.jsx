import React from "react";
import { FaRegUser } from "react-icons/fa";
import { RiFileList2Line, RiDashboardLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function ControlPanel() {
  const controlBars = [
    {
      text: "Profile",
      icon: <FaRegUser className="icon" />,
    },
    {
      text: "My Tracks",
      icon: <RiDashboardLine className="icon" />,
    },
    {
      text: "Tracks",
      icon: <RiFileList2Line className="icon" />,
    },
  ];
  return (
    <div className="control-panel all-center-column justify-content-start">
      <div className="brand text-white">
        <Link
          className="logo bold text-white text-decoration-none d-md-block d-none"
          to="/"
        >
          TrackerBase
        </Link>
      </div>

      <div className="control-bars w-100 ml-xl-4 mt-4">
        {controlBars.map((controlBar, index) => (
          <div
            className="control-bar text-white bold py-3 d-flex align-items-center justify-content-lg-start justify-content-center"
            role="button"
            key={index}
          >
            {controlBar.icon}
            <span className="mb-0 ml-xl-5 ml-3 d-lg-inline d-none">
              {controlBar.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
