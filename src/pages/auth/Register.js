import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from '../../components/Loader';
import axios from 'axios';
import { useAuth } from '../../Context/authContext';  // Import the useAuth hook
import Cookies from 'js-cookie';
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false); // Change setter function to setLoading
    const [auth, setAuth] = useAuth();
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "") {
            toast.error("Name is required!");
            return;
        } else if (email === "") {
            toast.error("Email is required!");
            return;
        } else if (password === "") {
            toast.error("Password is required!");
            return;
        } else if (!isChecked) {
            toast.error("You must agree to the Terms & Privacy before registering.");
            return;
        }

        setLoading(true); // Start loading

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,
                email,
                password,
            });

            if (res.data.success) {

                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <Navbar />
            {loading && <Loader />} {/* Display loader when loading */}
            <div className="mt-top">
                <div className="reg-main">
                    <div className="reg-sub">
                        <div className="reg-left">
                            <p className="text-white login-wel">WELCOME TO</p>
                            <h3 className="text-white login-t">DWELLY FIX</h3>
                            <p className="text-white login-wel">Create Account</p>
                        </div>
                        <div className="reg-right">

                            <h3>Create an Account</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="auth-inp-main">
                                    <label className='form-label'>Name*</label>
                                    <input
                                        type="text"
                                        name='name'
                                        className='auth-inp'
                                        placeholder='John Smith'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="auth-inp-main">
                                    <label className='form-label'>Email*</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='auth-inp'
                                        placeholder='support@pqs.com'
                                    />
                                </div>
                                <div className="auth-inp-main">
                                    <label className='form-label'>Password*</label>
                                    <input
                                        type="password" // Change input type to password
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='auth-inp'
                                        placeholder='pqs12345'
                                    />
                                </div>
                                <div className="d-flex">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className='form-label ms-3'>I agree to the Terms & Privacy</label>
                                </div>
                                <div className="my-3">
                                    <button type="submit" className='sub-btn-b w-100' disabled={loading}>
                                        {loading ? "Signing Up..." : "SIGN UP"}
                                    </button>
                                </div>
                                <p className="text-center form-label">
                                    Already have an account? <Link className='text-coomon-color' to="/login"> Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
