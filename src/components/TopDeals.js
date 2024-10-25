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
                            Carne macchinata BBQ
                        </h4>
                        <p className='top-deal-card-text'>
                            1 Zinger Stacker + 1 patatine normali + 1 bevanda normale </p>
                        <h4 className="top-deal-card-title">
                            9 €
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
                            Anelli di cipolla 8 pcs
                        </h4>
                        <p className='top-deal-card-text'>
                            2 Zinger Burge + 2 € Bevande Regular + Wings Bucket (8 pz)
                        </p>
                        <h4 className="top-deal-card-title">
                            11 €
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
                            chicken nuggets 6 pcs
                        </h4>
                        <p className='top-deal-card-text'>
                            Alza il divertimento con 5 pezzi di pollo caldo e croccante + 1 grande
                        </p>
                        <h4 className="top-deal-card-title">
                            13 €
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
                            Riso Flafal piastro
                        </h4>
                        <p className='top-deal-card-text'>
                            Un pasto definitivo per la famiglia. Include 4 pollo Zinger
                        </p>
                        <h4 className="top-deal-card-title">
                            20 €
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