import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoClose, IoCloudUpload, IoFastFoodOutline } from "react-icons/io5";
import './sidebar.css';
import { MdDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GoPlus } from "react-icons/go";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaJediOrder, FaUserSecret } from "react-icons/fa6";
const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
    const location = useLocation(); // to get the current URL path
    const [activePath, setActivePath] = useState('');

    useEffect(() => {
        // Update activePath whenever the location changes
        setActivePath(location.pathname);
    }, [location]);


    return (
        <nav id="sidebar" className={sidebarOpen ? "active" : ""}>
            <div className="custom-menu">
                <button type="button" id="closeSidebar" onClick={toggleSidebar}>
                    <IoClose />
                </button>
            </div>

            <div className="py-2">
                <div className="my-2">
                    <Link to="/">
                        <h1 className='auth-title text-center'>
                            <span>Ali</span> Kebab
                        </h1>
                    </Link>
                </div>

                <ul className="list-unstyled components mb-5">
                    <li className={activePath === '/dashboard/admin' ? 'active-sidebar' : ''}>
                        <Link to="/dashboard/admin">
                            <MdDashboardCustomize className="mr-3" /> Dashboard
                        </Link>
                    </li>
                    <li className={activePath === '/dashboard/admin/category' ? 'active-sidebar' : ''}>
                        <Link to="/dashboard/admin/category">
                            <MdProductionQuantityLimits className="mr-3" />   Categories
                        </Link>
                    </li>
                    <li className={activePath === '/dashboard/admin/foods' ? 'active-sidebar' : ''}>
                        <Link to="/dashboard/admin/foods">
                            <IoFastFoodOutline className="mr-3" />  Foods
                        </Link>
                    </li>

                    <li className={activePath === '/dashboard/admin/orders' ? 'active-sidebar' : ''}>
                        <Link to="/dashboard/admin/orders">
                            <FaJediOrder className="mr-3" />  Orders
                        </Link>
                    </li>
                    <li className={activePath === '/dashboard/admin/users' ? 'active-sidebar' : ''}>
                        <Link to="/dashboard/admin/users">
                            <FaUserSecret className="mr-3" />   Users
                        </Link>
                    </li>

                    <li className={activePath === '/dashboard/admin/profile' ? 'active-sidebar' : ''}>
                        <Link to="/dashboard/admin/profile">
                            <CgProfile className="mr-3" />  Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
