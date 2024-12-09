import React, { useEffect, useState } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Button, Modal } from 'antd';

const TopDeals = () => {
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

    useEffect(() => {
        fetchFoods();
    }, []);

    const showModal = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <>
            <div className="explore-menu-main">
                <h2 className="common-menu-title mb-5">
                    TOP DEALS
                </h2>
                <div className="top-deals-main">
                    {foods?.length > 0 ? (
                        foods.slice(-4).map((item) => {
                            const truncatedDescription = item.description.length > 64 ? item.description.slice(0, 64) + '...' : item.description;

                            return (
                                <div className="top-deal-card" key={item.id} onClick={() => showModal(item)}>
                                    <img src={item.images[0]} className='top-deal-card-img' alt={`${item.title}`} />
                                    <h4 className="top-deal-card-title">
                                        {item.title}
                                    </h4>
                                    <p className='top-deal-card-text'>
                                        {truncatedDescription}
                                    </p>
                                    <h4 className="top-deal-card-title">
                                        {item.sprice} €
                                    </h4>
                                    <div className="mt-3">
                                        <button type="button" className='login-btn border-0'>Aggiungi al secchio</button>
                                        <button className='fav-btn'>
                                            <FaRegHeart />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <h3>No Data Found</h3>
                        </>
                    )}

                </div>
            </div>
            {selectedItem && (
                <Modal
                    title={selectedItem.text}
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
                        <h5>Price: € {selectedItem.sprice}</h5>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default TopDeals;
