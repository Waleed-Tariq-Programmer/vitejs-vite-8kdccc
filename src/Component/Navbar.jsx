import React, { useState } from 'react';
import NavLinkComponent from './NavLinkComponent';
import Search from './Search';
import Notification from './Notification';
import { useSelector, useDispatch } from 'react-redux';
import { Loginout } from '../Feature/authSlice.js';
import swal from 'sweetalert';
import CreateModal from './CreateModal';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentusers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const [sidebarWidth, setSidebarWidthState] = useState(280); // Define sidebarWidth state here

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    swal({
      title: "Are you sure you want to log out?",
      text: "You will be logged out of your account.",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        dispatch(Loginout());
        navigate("/");
      }
    });
  };

  const toggleSidebar = (component) => {
    if (activeComponent === component) {
      setSidebarWidthState(280); // Update local sidebarWidth state
      setActiveComponent(null); 
    } else {  
      setSidebarWidthState(80); // Update local sidebarWidth state
      setActiveComponent(component);
      setDropdownOpen(false);
    }
   
  };

  const handleSearchClick = () => toggleSidebar('search');
  const handleNotificationClick = () => toggleSidebar('notification');
  const handleCreateClick = () => toggleSidebar('create');
  const handleNavLinkClick = () => {
    setSidebarWidthState(280); // Update local sidebarWidth state
    setActiveComponent(null);
   
  };

  return (
    <>
      <div className={`h-full bg-white p-[20px] shadow-md border-r-2 border-[#DADADA] transition-all duration-300 ${sidebarWidth === 80 ? 'w-[80px] flex items-center flex-col ' : 'w-[240px]'}`}>
        <div className="flex items-center justify-start pt-[20px] pb-[20px] mb-[20px]">
          <img src={sidebarWidth === 80 ? 'logo.svg' : 'Instagram.svg'} alt="logo" />
        </div>

        <div>
          <ul className={`${sidebarWidth === 80 ? 'flex items-center flex-col justify-center gap-2' : ''}`}>
            <NavLinkComponent
              to="/home"
              iconSrc="Home.svg"
              label="Home"
              isCollapsed={sidebarWidth === 80}
              onClick={handleNavLinkClick}
            />
            <NavLinkComponent
              to="#"
              iconSrc="Search.svg"
              label="Search"
              isCollapsed={sidebarWidth === 80}
              onClick={handleSearchClick}
            />
            <NavLinkComponent
              to="/explore"
              iconSrc="Explore.svg"
              label="Explore"
              isCollapsed={sidebarWidth === 80}
              onClick={handleNavLinkClick}
            />
            <NavLinkComponent
              to="/reels"
              iconSrc="Reels.svg"
              label="Reels"
              isCollapsed={sidebarWidth === 80}
              onClick={handleNavLinkClick}
            />
            <NavLinkComponent
              to="/messages"
              iconSrc="Messages.svg"
              label="Messages"
              isCollapsed={sidebarWidth === 80}
              onClick={handleNavLinkClick}
            />
            <NavLinkComponent
              to="#"
              iconSrc="Notifications.svg"
              label="Notifications"
              isCollapsed={sidebarWidth === 80}
              onClick={handleNotificationClick}
            />
            <NavLinkComponent
              to="#"
              iconSrc="Create.svg"
              label="Create"
              isCollapsed={sidebarWidth === 80}
              onClick={handleCreateClick}
            />
            <NavLinkComponent
              to="/profile"
              iconSrc={currentUser ? currentUser.image : "profile.jpeg"}
              label="Profile"
              isCollapsed={sidebarWidth === 80}
              className="h-[24px] rounded-full"
              onClick={handleNavLinkClick}
            />
            <li className="relative">
              <div
                className="flex items-center gap-2 text-lg pt-[12px] pb-[12px] cursor-pointer"
                onClick={toggleDropdown}
              >
                <span>
                  <img src="Setting.svg" className="h-[24px]" alt="Settings" />
                </span>
                {sidebarWidth !== 80 && <span className="ml-2">More</span>}
              </div>

              {dropdownOpen && (
                <div className="absolute left-0 bottom-full mb-2 bg-white border border-gray-300 shadow-lg rounded-lg w-[180px] p-2 z-[9999]">
                  <ul className="text-left">
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Settings</li>
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Privacy</li>
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>

      {activeComponent === 'search' && <Search />}
      {activeComponent === 'notification' && <Notification />}
      {activeComponent === 'create' && <CreateModal handle={handleCreateClick} showCreate={activeComponent === 'create'} />}
    </>
  );
};

export default Navbar;
