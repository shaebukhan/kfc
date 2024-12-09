import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import Explorer1 from "../assets/images/explore1.png";
import Explorer2 from "../assets/images/explore2.png";
import Explorer3 from "../assets/images/explore3.png";
import Explorer4 from "../assets/images/explore4.png";
import Explorer5 from "../assets/images/explore5.png";
import Explorer6 from "../assets/images/explore6.png";
import Explorer7 from "../assets/images/explore7.png";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const explorerImages = [
    Explorer1,
    Explorer2,
    Explorer3,
    Explorer4,
    Explorer5,
    Explorer6,
    Explorer7,
];


const ExploreMenu = () => {
    const [categories, setCategories] = useState([]);

    //get all categories  
    const getAllCategory = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !!");
        }
    };
    useEffect(() => {
        getAllCategory();
    }, []);
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
                        // pagination={{
                        //     clickable: true,
                        // }}
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
                        {
                            categories?.length > 0 ? (
                                categories.map((cat, index) => (
                                    <SwiperSlide key={index}>
                                        <Link to={`/category/${cat.name}`}>
                                            <div className="explore-card-main">
                                                <img src={explorerImages[index % explorerImages.length]} alt={cat.name || "Explorer Image"} />
                                                <h5 className="explore-card-main-text text-dark">{cat.name}</h5>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <div>
                                    <h3>No Data Found</h3>
                                </div>
                            )
                        }
                    </Swiper>

                </div>
            </div>
        </>
    );
};

export default ExploreMenu;