import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from '../../components/Loader';
import axios from 'axios';
import { useAuth } from '../../Context/authContext';  // Import the useAuth hook
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Change setter function to setLoading
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
            {loading && <Loader />}
            <div className="mt-top"> </div>
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
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                                    Register      </button>
                            </div>
                            <div className="text-center">
                                <Link to={"/login"} className='link-btn text-dark'>
                                    Already have an Account  ? <span className='c-clr'>Login</span>           </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
