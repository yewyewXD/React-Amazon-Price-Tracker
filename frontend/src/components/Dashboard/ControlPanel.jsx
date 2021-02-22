import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";

export default function ControlPanel() {
  const [activeBarId, setActiveBarId] = useState(2);
  const controlBars = [
    {
      id: 1,
      text: "Profile",
      icon: <FaRegUser className="icon" />,
      isLocked: true,
    },
    {
      id: 2,
      text: "My Tracks",
      icon: <RiDashboardLine className="icon" />,
      isLocked: false,
    },
    {
      id: 3,
      text: "Price Analytics",
      icon: <RiDashboardLine className="icon" />,
      isLocked: true,
    },
    {
      id: 4,
      text: "Email Management",
      icon: <RiDashboardLine className="icon" />,
      isLocked: true,
    },
  ];
  return (
    <div className="control-panel all-center-column flex-sm-column flex-row-reverse justify-content-start">
      <div className="control-bars d-sm-block all-center-column flex-sm-column flex-row w-100">
        {controlBars.map((controlBar) => (
          <div
            className={`control-bar ${
              activeBarId === controlBar.id && "control-bar--selected"
            } ${
              controlBar.isLocked && "control-bar--locked"
            } text-white bold all-center justify-content-lg-start d-sm-flex d-none`}
            role="button"
            key={`controlBar-${controlBar.id}`}
            onClick={() => {
              if (!controlBar.isLocked) {
                setActiveBarId(controlBar.id);
              }
            }}
          >
            {controlBar.icon}
            <span className="mb-0 ml-4 d-lg-inline d-none">
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
