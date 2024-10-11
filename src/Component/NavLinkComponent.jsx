
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkComponent = ({ to, iconSrc, label, isCollapsed, onClick , className}) => {
  return (
    <li>
      <NavLink
        to={to}
        className="flex items-center gap-2 text-lg pt-[12px] pb-[12px] cursor-pointer"
        onClick={onClick}
      >
        <span>
          <img src={iconSrc} alt={`${label} Icon`} className={className}/>
        </span>
        {!isCollapsed && <span className="ml-2">{label}</span>}
      </NavLink>
    </li>
  );
};

export default NavLinkComponent;
