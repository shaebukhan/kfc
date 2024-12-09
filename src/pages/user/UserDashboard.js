import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserSidebar from './UserSidebar';



const UserDashboard = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Function to toggle the sidebar open/close
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const authDataString = Cookies.get('auth');
    const auth = JSON.parse(authDataString);


    return (
        <>
            <div className="dashboard-container"></div>
            <UserSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            {/* Main Content */}
            <div className={`dashboard-main ${sidebarOpen ? 'shifted' : ''}`}>

                <div className="kyc-screen common-prop">
                    <h3 className='common-title my-3'> Profile</h3>
                    <div className="w-100 mb-3">
                        <label >Name</label>
                        <input type="text" className="form-control w-100" value={auth.user.name} disabled />
                    </div>
                    <div className="w-100 mb-3">
                        <label >Email</label>
                        <input type="text" value={auth.user.email} className="form-control w-100" disabled />
                    </div>
                    <div className=" py-3">
                        <Link className='common-nav-right' to={"/dashboard/user/profile-settings"}>
                            Edit Profile
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default UserDashboard;



