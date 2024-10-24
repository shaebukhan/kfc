import React from 'react';
import Exlporer1 from "../assets/images/explore1.png";
import Exlporer2 from "../assets/images/explore2.png";
import Exlporer3 from "../assets/images/explore3.png";
import Exlporer4 from "../assets/images/explore4.png";
import { FaRegHeart } from "react-icons/fa";
const TopDeals = () => {
    return (
        <>
            <div className="explore-menu-main">
                <h2 className="common-menu-title mb-5">
                    TOP DEALS
                </h2>
                <div className="top-deals-main">
                    <div className="top-deal-card">
                        <img src={Exlporer1} className='top-deal-card-img' alt="" />
                        <h4 className="top-deal-card-title">
                            Zinger Stacker Combo
                        </h4>
                        <p className='top-deal-card-text'>
                            1 Zinger Stacker + 1 Regular fries + 1 Regular drink </p>
                        <h4 className="top-deal-card-title">
                            Rs 950
                        </h4>
                        <div className="mt-3">
                            <button type="button" className='login-btn border-0'>Aggiungi al secchio</button>
                            <button className='fav-btn'>
                                <FaRegHeart />
                            </button>
                        </div>
                    </div>
                    <div className="top-deal-card">
                        <img src={Exlporer2} className='top-deal-card-img' alt="" />
                        <h4 className="top-deal-card-title">
                            Zinger Got Wings
                        </h4>
                        <p className='top-deal-card-text'>
                            2 Zinger Burgers + 2 Regular Drinks + Wings Bucket (6 pcs)
                        </p>
                        <h4 className="top-deal-card-title">
                            Rs 1150
                        </h4>
                        <div className="mt-3">
                            <button type="button" className='login-btn border-0'>Aggiungi al secchio</button>
                            <button className='fav-btn'>
                                <FaRegHeart />
                            </button>
                        </div>
                    </div> <div className="top-deal-card">
                        <img src={Exlporer3} className='top-deal-card-img' alt="" />
                        <h4 className="top-deal-card-title">
                            Crispy Duo Box
                        </h4>
                        <p className='top-deal-card-text'>
                            Turn up the fun with 5 pcs Hot & Crispy Chicken + 1 Large


                        </p>
                        <h4 className="top-deal-card-title">
                            Rs 1350
                        </h4>
                        <div className="mt-3">
                            <button type="button" className='login-btn border-0'>Aggiungi al secchio</button>
                            <button className='fav-btn'>
                                <FaRegHeart />
                            </button>
                        </div>
                    </div> <div className="top-deal-card">
                        <img src={Exlporer4} className='top-deal-card-img' alt="" />
                        <h4 className="top-deal-card-title">
                            Family Festival 3
                        </h4>
                        <p className='top-deal-card-text'>
                            An ultimate meal for the fam. It includes 4 Zinger  Chicken
                        </p>
                        <h4 className="top-deal-card-title">
                            Rs 2950
                        </h4>
                        <div className="mt-3">
                            <button type="button" className='login-btn border-0'>Aggiungi al secchio</button>
                            <button className='fav-btn'>
                                <FaRegHeart />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopDeals;