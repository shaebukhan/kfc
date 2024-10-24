import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import Exlporer1 from "../assets/images/explore1.png";
import Exlporer2 from "../assets/images/explore2.png";
import Exlporer3 from "../assets/images/explore3.png";
import Exlporer4 from "../assets/images/explore4.png";
import Exlporer5 from "../assets/images/explore5.png";
import Exlporer6 from "../assets/images/explore6.png";
import Exlporer7 from "../assets/images/explore7.png";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
const ExploreMenu = () => {
    return (
        <>
            <div className="explore-menu-main">
                <h2 className="common-menu-title">
                    EXPLORE MENU
                </h2>
                <div className='p-2 bg-little-dark'>

                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        freeMode={true}
                        grabCursor={true}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        // navigation={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false, // Autoplay continues even after interaction
                        }}
                        modules={[FreeMode, Pagination, Navigation]}
                        breakpoints={{
                            300: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 40,
                            },

                            1023: {
                                slidesPerView: 3, // Show 3 slides for width <= 1023px
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5, // Show 5 slides for width >= 1024px
                                spaceBetween: 20,
                            },
                        }}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="explore-card-main">
                                <img src={Exlporer1} alt="EveryDay Value" />
                                <h5 className="explore-card-main-text">EveryDay Value</h5>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="explore-card-main">
                                <img src={Exlporer2} alt="Signature-boxes" />
                                <h5 className="explore-card-main-text">Signature-boxes</h5>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="explore-card-main">
                                <img src={Exlporer3} alt="Promotion" />
                                <h5 className="explore-card-main-text">Promotion</h5>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="explore-card-main">
                                <img src={Exlporer4} alt="Sharing" />
                                <h5 className="explore-card-main-text">Sharing</h5>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="explore-card-main">
                                <img src={Exlporer5} alt="Snack&Beveages" />
                                <h5 className="explore-card-main-text">Snack&Beveages</h5>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="explore-card-main">
                                <img src={Exlporer6} alt="Midnight" />
                                <h5 className="explore-card-main-text">Midnight</h5>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="explore-card-main">
                                <img src={Exlporer7} alt="Midnight" />
                                <h5 className="explore-card-main-text">Ale-carte</h5>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>
            </div>
        </>
    );
};

export default ExploreMenu;