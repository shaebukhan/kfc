import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import './sidebar.css';
import { LuLayoutDashboard } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { FaBarsStaggered } from 'react-icons/fa6';
import { MdWorkHistory } from "react-icons/md";
const UserSidebar = ({ sidebarOpen, toggleSidebar }) => {
    const location = useLocation();
    const [activePath, setActivePath] = useState('');


    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);



    return (
        <>
            <button
                type="button"
                className="user-menu-bars"
                onClick={toggleSidebar}
            >
                <FaBarsStaggered />
            </button>

            <nav id="user-sidebar" className={sidebarOpen ? "user-active" : ""}>
                <div className="user-custom-menu">
                    <button type="button" id="user-closeSidebar" onClick={toggleSidebar}>
                        <IoClose />
                    </button>
                </div>

                <div className="py-2">
                    <div className="my-2">
                        <Link to="/">

                        </Link>
                    </div>

                    <ul className="user-list-unstyled user-components mb-5">
                        <li className={activePath === '/dashboard/user' ? 'user-active-sidebar' : ''}>
                            <Link to="/dashboard/user">
                                <LuLayoutDashboard className="me-3" /> Dashboard
                            </Link>
                        </li>
                        <li className={activePath === '/dashboard/user/orders' ? 'user-active-sidebar' : ''}>
                            <Link to="/dashboard/user/orders">
                                <MdWorkHistory className="me-3" />  Orders History
                            </Link>
                        </li>
                        <li className={activePath === '/dashboard/user/profile-settings' ? 'user-active-sidebar' : ''}>
                            <Link to="/dashboard/user/profile-settings">
                                <FiSettings className="me-3" />Profile Settings
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default UserSidebar;
