import React, { useState, useEffect } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import AdminNav from './AdminNav';
import Sidebar from './Sidebar';
import { Card } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Cookies from 'js-cookie';

const AdminProfile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(() => {
        const authData = Cookies.get('auth');
        return authData ? JSON.parse(authData) : null;
    });
    const [formData, setFormData] = useState({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
        id: auth?.user?.id || '',
        password: ''
    });

    const Authdata = JSON.parse(Cookies.get("auth"));
    const id = Authdata.user.id;
    useEffect(() => {
        // Update form data when auth state changes
        setFormData({
            name: auth?.user?.name || '',
            email: auth?.user?.email || '',
            id: auth?.user?._id || '',
            password: ''
        });
    }, [auth]);
    const token = Cookies.get("token");
    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Handle form submission for updating profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        // Validate if email contains "@"
        if (!email.includes('@')) {
            toast.error("Invalid Email! Please include '@' in your email.");
            return;
        }

        // Validate if email is empty
        if (email === "") {
            toast.error("Email is required!");
            return;
        }

        setLoading(true);

        // Prepare payload for profile update
        const payload = { name, email, id };
        if (password) {
            payload.password = password;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/update-profile/${id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success('Profile updated successfully!');

                // Update auth state and cookies with the latest user data
                const updatedUser = {
                    ...auth.user,
                    name: response.data.user.name,
                    email: response.data.user.email
                };

                const updatedAuth = {
                    ...auth,
                    user: updatedUser
                };

                setAuth(updatedAuth);
                Cookies.set('auth', JSON.stringify(updatedAuth), { expires: 7, sameSite: 'Lax', secure: true });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            {loading && <Loader />}
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div id="content" className="px-2">
                    <button type="button" id="openSidebar" onClick={toggleSidebar} className="bars-btn">
                        <FaBarsStaggered />
                    </button>
                    <AdminNav />
                    <div className="p-3">
                        <Card style={{ maxWidth: 800, margin: '0 auto', marginTop: 50 }}>
                            <h3 className="text-center">Update Profile</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="password">New Password (optional)</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter new password"
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="add-user-btn" type="submit">
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProfile;
