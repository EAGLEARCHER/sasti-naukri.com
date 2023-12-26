// NavLinks.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

export default function NavLinks({ toggleSidebar }) {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon: Icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            key={id}
            onClick={toggleSidebar}
          >
            <span className="icon">
              <Icon />
            </span>{" "}
            {/* Render the Icon component */}
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
