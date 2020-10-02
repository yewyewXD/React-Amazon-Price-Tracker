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
    <div className="control-panel p-4 all-center-column justify-content-start">
      <div className="brand text-white">
        <Link className="logo bold text-white text-decoration-none" to="/">
          TrackerBase
        </Link>
      </div>

      <div className="control-bars w-100 pl-4 pt-4">
        {controlBars.map((controlBar, index) => (
          <div
            className="control-bar bold mt-4 d-flex align-items-center"
            role="button"
            key={index}
          >
            {controlBar.icon}
            <span className="mb-0 ml-5">{controlBar.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
