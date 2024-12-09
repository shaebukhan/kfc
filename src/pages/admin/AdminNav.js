import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const AdminNav = () => {
    const navigate = useNavigate();



    const handleLogout = async () => {
        try {
            // Send POST request to the server to log out
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/logout`);

            if (res.data.success) {


                Cookies.remove("token"); // Removes the 'token' cookie
                Cookies.remove("auth");  // Removes the 'auth' cookie

                // Show a logout notification
                toast.info("Logged out successfully");

                // Redirect to the login page
                navigate('/login');
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during logout:", error);

        }
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="1" icon={<SettingOutlined />}>
                <Link to={"/dashboard/admin/profile"}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
                {/* Use an onClick here instead of Link */}
                <span >Logout</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'end', padding: ' 20px' }}>
            <Dropdown overlay={userMenu} trigger={['click']}>
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Avatar icon={<UserOutlined />} />
                    <span style={{ marginLeft: 8 }}>Admin</span>

                </div>
            </Dropdown>
        </div>
    );
};

export default AdminNav;
