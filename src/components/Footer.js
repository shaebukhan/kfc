import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const Footer = () => {
    return (
        <>

            <div className="common-space pb-1 ftr">
                <div className="container-fluid mb-5">
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/">
                                <div className="d-flex align-items-center">
                                    <img src={Logo} alt="logo" />

                                </div>
                            </Link>
                            <p className="ftr-text my-5">
                                KFC è entrato in Italia nel 1997 e da allora è stato un viaggio pieno di emozioni e bontà da leccarsi le dita!  Lickin’ Chicken è disponibile in 37 città con oltre 128 ristoranti! Essendo la catena di fast food più amata di KFC, non lascia nulla di
                            </p>

                        </div>

                        <div className="col-md-4 d-flex justify-content-center">
                            <div className="ftr-second-sec">
                                <h6 className="ftr-small-title">informazioni</h6>
                                <div className="ftr-sub">
                                    <Link className="ftr-link" to="/about">Chi siamo</Link>
                                    <Link className="ftr-link" to="/feedback">Feedback </Link>
                                    <Link className="ftr-link" to="/terms&conditions">Termini e condizioni </Link>
                                    <Link className="ftr-link" to="/privacy-policy">politica sulla riservatezza </Link>
                                    <Link className="ftr-link" to="/contact">Contattaci</Link>
                                    <Link className="ftr-link" to="/careers">Carriera</Link>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-4">
                            <h6 className="ftr-small-title">Contatto </h6>
                            <div className="ftr-link">
                                <Link to="tel:0812220690" className="ftr-text">
                                    <FaPhone className="me-3 c-clr" /> 08-12 22 06 90
                                </Link>
                            </div>
                            <div className="ftr-link">
                                <Link to="tel:0812220690" className="ftr-text">
                                    <MdEmail className="me-3 c-clr" />  kfcinfo@gmail.com
                                </Link>
                            </div>
                            <div className="ftr-link">
                                <Link to="tel:0812220690" className="ftr-text">
                                    <FaYoutube className="me-3 c-clr" />  Youtube
                                </Link>
                            </div>
                            <div className="ftr-link">
                                <Link to="tel:0812220690" className="ftr-text">
                                    <FaInstagram className="me-3 c-clr" />  Instagram
                                </Link>
                            </div>
                            <div className="ftr-link">
                                <Link to="tel:0812220690" className="ftr-text">
                                    <FaFacebook className="me-3 c-clr" />   Facebook
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-3 p-2">
                    2024 KFC. All rights reserved
                </div>


            </div>

        </>
    );
};

export default Footer;
