import React, { useRef } from 'react';
import { Carousel } from 'antd'; // Import Ant Design Carousel
import Carousel1 from "../assets/images/carousel1.jpg";
import Carousel2 from "../assets/images/carousel2.jpg";
import Carousel3 from "../assets/images/carousel3.jpg";
import Carousel4 from "../assets/images/carousel4.jpg";

const CustomCarousel = () => {
    const carouselRef = useRef(null);
    const contentStyle = {
        width: '100%',
        // height: '700px', // Adjust the height as needed
        // objectFit: 'cover',

    };

    return (
        <>
            <div className="mt-top"></div>
            <Carousel autoplay ref={carouselRef} effect="fade" arrows infinite >
                <div>
                    <img src={Carousel1} style={contentStyle} alt="Slide 1" />
                </div>
                <div>
                    <img src={Carousel2} style={contentStyle} alt="Slide 2" />
                </div>
                <div>
                    <img src={Carousel3} style={contentStyle} alt="Slide 3" />
                </div>
                <div>
                    <img src={Carousel4} style={contentStyle} alt="Slide 4" />
                </div>


            </Carousel>
        </>
    );
};

export default CustomCarousel;
