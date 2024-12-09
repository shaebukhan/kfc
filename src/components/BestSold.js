import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Sold1 from "../assets/images/sold1.png";
import Sold2 from "../assets/images/fast1.jpeg";
import Sold3 from "../assets/images/sold3.png";
import Sold4 from "../assets/images/fast3.jpeg";
import Sold5 from "../assets/images/sold5.png";
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const carouselData = [
    { id: 2, imgSrc: Sold1, text: "Bandidos", price: 5 },
    { id: 3, imgSrc: Sold2, text: "Panino o Piadena", price: 6 },
    { id: 4, imgSrc: Sold3, text: "Panino hot dog", price: 5 },
    { id: 5, imgSrc: Sold4, text: "Piadena kebab Grande", price: 7 },
    { id: 6, imgSrc: Sold5, text: "Panino hamburger", price: 8 },
];
const BestSold = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFoods = async (page = 1, keyword = "") => {
        setLoading(true);
        try {
            const endpoint = keyword.trim()
                ? `search/${keyword.trim()}`
                : "get-foods";

            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/food/${endpoint}`,
                { params: { page, limit: 20 } }
            );

            if (data) {
                setFoods(data.results || data.foods);

            } else {
                toast.error("No data received from server.");
            }
        } catch (error) {
            console.error("Error fetching foods:", error);

        } finally {
            setLoading(false);
        }
    };

    // Initial load and update on page or search term change
    useEffect(() => {
        fetchFoods();
    }, []);


    // Show the modal with the selected item details
    const showModal = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    // Hide the modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedItem(null); // Clear selected item
    };
    const settings = {

        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Auto slide
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024, // For screen width less than 1024px
                settings: {
                    slidesToShow: 3, // Show 3 slides
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // For screen width less than 768px
                settings: {
                    slidesToShow: 2, // Show 2 slides
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // For screen width less than 480px
                settings: {
                    slidesToShow: 1, // Show 1 slide
                    slidesToScroll: 1,
                },
            },
        ],
    };



    return (
        <>
            <div className="explore-menu-main">
                <h2 className="common-menu-title mb-5">
                    BEST SELLERS
                </h2>
                <div className="carousel-container">
                    <Slider {...settings}>
                        {foods?.length > 0 ? (
                            foods.map((item) => (
                                <div key={item.id} onClick={() => showModal(item)}>
                                    <div className="best-sold-card">
                                        <h5 className="best-sold-card-text">{item.title}</h5>
                                        <h5 className="best-sold-card-price">{item.sprice} €</h5>
                                        <img src={item.images[0]} alt={`${item.title}`} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <h3>No Data Found</h3>
                            </>
                        )}
                    </Slider>

                </div>
            </div>
            {selectedItem && (
                <Modal
                    title={selectedItem.text} // Title of the modal is the text of the selected item
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="close" onClick={handleCancel}>
                            Close
                        </Button>,
                        <Button key="add-to-cart" className='login-btn'>
                            aggiungi al secchio
                        </Button>,
                    ]}
                >
                    <div className="modal-content">
                        <div className="img-main d-flex justify-content-center">
                            <img style={{ marginTop: "20px" }}
                                src={selectedItem.images[0]}
                                alt={selectedItem.title}
                                className='w-50'
                            />
                        </div>
                        <h4 className='mt-3'>{selectedItem.title}</h4>
                        <p>Details about {selectedItem.description}</p>
                        <h5>Price: €  {selectedItem.sprice}</h5>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default BestSold;