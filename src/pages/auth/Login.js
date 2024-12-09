import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email contains "@"
        if (!email.includes('@')) {
            toast.error("Invalid Email! Please include '@' in your email.");
            return;
        }

        if (email === "") {
            toast.error("Email is Required !!");
            return;
        } else if (password === "") {
            toast.error("Password is Required !!");
            return;
        } else

            setLoading(true); // Show loader

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email,
                password,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                Cookies.set("token", res.data.token, { expires: 1, sameSite: 'Lax', secure: true });
                Cookies.set("auth", JSON.stringify({
                    user: res.data.user,
                }), { expires: 1, sameSite: 'Lax', secure: true });

                if (res.data.user.role === 1) {
                    navigate("/dashboard/admin");
                    return;
                }
                navigate("/dashboard/user");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <>
            <Navbar />
            {loading && <Loader />}
            <div className="mt-top"></div>
            <div className="auth-main">
                <div className="auth-sub">
                    <h1 className='auth-title text-center'>
                        <span>Ali</span> Kebab
                    </h1>
                    <div className="auth-inp-main">
                        <form className='form-login' onSubmit={handleSubmit}>
                            <div className="auth-group">
                                <input
                                    type="text"
                                    placeholder='Email ou Account ID'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="auth-group position-relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder='Mot de passe'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Binding input with state
                                />
                                <span
                                    className="toggle-btn"
                                    id="togglePassword"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <div className="py-3 d-flex justify-content-center">
                                <button className='auth-btn border-0'>
                                    Login       </button>
                            </div>
                            <div className="text-center">
                                <Link to={"/register"} className='link-btn text-dark'>
                                    don't have an Account  ? <span className='c-clr'>Register</span>           </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;