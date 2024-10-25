import React, { useState } from 'react';
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
                        {carouselData.map((item) => (
                            <div key={item.id} onClick={() => showModal(item)}>
                                <div className="best-sold-card">
                                    <h5 className="best-sold-card-text">{item.text}</h5>
                                    <h5 className='best-sold-card-price'> {item.price}  € </h5>
                                    <img

                                        src={item.imgSrc}
                                        alt={`Carousel ${item.id}`}
                                    />

                                </div>
                            </div>
                        ))}
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
                            <img style={{ marginTop: "-20px" }}
                                src={selectedItem.imgSrc}
                                alt={selectedItem.text}
                                className='w-50'
                            />
                        </div>

                        <h5>Price: €  {selectedItem.price}</h5>
                        <p>Details about {selectedItem.text}</p>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default BestSold;