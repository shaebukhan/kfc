import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { FaB, FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { FaShoppingCart } from "react-icons/fa";
const Navbar = () => {

    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);

    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        });
        Cookies.remove("token"); // Removes the 'token' cookie
        Cookies.remove("auth");  // Removes the 'auth' cookie

        toast.info("Logged out");
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (


        <>
            <div className={`navbarr ${isMenuOpen ? 'open' : ''}`}>
                <div className="navbar-logo">
                    <FaBarsStaggered className="sidebar-open-btn" onClick={openMenu} />
                    <Link to="/">
                        {/* <img className="logo" src={Logo} alt="logo" /> */}
                        <div className="logo-text"> <div className="c-clr">Ali </div> <span>Kebab</span></div>
                    </Link>
                </div>
                <div id="sidemenu" className={`${isMenuOpen ? 'active-sidebar-menu' : ''}`}>
                    <button className="close-btn" onClick={closeMenu}>
                        <IoClose />
                    </button>
                    <Link className="nav-linkk" to="/about">Chi siamo</Link>
                    <Link className="nav-linkk" to="/feedback">Feedback </Link>
                    <Link className="nav-linkk" to="/terms&conditions">Termini e condizioni </Link>
                    <Link className="nav-linkk" to="/privacy-policy">politica sulla riservatezza </Link>
                    <Link className="nav-linkk" to="/contact">Contattaci</Link>
                    <Link className="nav-linkk" to="/careers">Carriera</Link>

                </div>
                <div className="nav-right">
                    <div className="cart-btn">
                        <FaShoppingCart />
                        <div className="cart-number">0</div>
                    </div>
                    {
                        !auth.user ? (<>  <Link to="/login" className="login-btn">Login</Link>
                            {/* <Link to="/register" className="reg-btn">Sign up</Link>  */}
                        </>) : (<>

                            <div className="custom-nav-item">
                                <button
                                    className="acc-circle border-0"
                                    onClick={toggleDropdown}
                                    aria-expanded={dropdownOpen}
                                >

                                    {auth?.user?.name && auth.user.name[0].toUpperCase()}
                                </button>
                                {dropdownOpen && (
                                    <ul className="custom-dropdown-menu">
                                        <li>
                                            <NavLink
                                                className="custom-dropdown-item"
                                                to={`/dashboard/${auth?.user.role === 1 ? "admin" : "user"}`}
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="custom-dropdown-item"
                                                onClick={() => {
                                                    handleLogout();
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                Logout
                                            </NavLink>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </>)
                    }


                </div>

            </div>

        </>
    );
};

export default Navbar;
