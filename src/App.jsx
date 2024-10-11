import React,{useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';


function App() {
  
  const location = useLocation();
  const showNavbar = !['/', '/sign'].includes(location.pathname);
  const showSidebar = !['/', '/sign' , '/explore' , '/reels' , '/messages', '/profile'].includes(location.pathname);
 
  return (
    <div className="flex h-screen">
      {showNavbar && <Navbar />}
      
      <div className="flex-grow overflow-y-auto h-full scrollbar-hide">
        <Outlet />
      </div>

      {showSidebar && (
        <Sidebar/>
      )}
    </div>
  );
}

export default App;
