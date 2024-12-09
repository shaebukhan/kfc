import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Sidebar from './Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { toast } from "react-toastify";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { PiHandWithdraw } from "react-icons/pi";
import axios from 'axios';
import { FaShippingFast } from "react-icons/fa";
import AdminNav from './AdminNav';
import Loader from '../../components/Loader';
import { MdProductionQuantityLimits } from 'react-icons/md';
const AdminDash = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const token = Cookies.get("token");
    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const getAllData = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-data`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data?.success) {
                setUsers(data?.allData?.userCount || []);
                setProducts(data?.allData?.productCount || []);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch users and products when component mounts
    useEffect(() => {
        getAllData();
    }, []);

    return (
        <div className="wrapper d-flex align-items-stretch">
            {loading && <Loader />}

            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            {/* Page Content */}
            <div id="content" className="px-2">
                <button type="button" id="openSidebar" onClick={toggleSidebar} className="bars-btn">
                    <FaBarsStaggered />
                </button>
                <AdminNav />
                <div className="mt-3">
                    <div className="boxes-main">
                        <Link className='box-btn'>
                            <LuUser2 className='box-btn-icon' />
                            <h4 className="box-title">
                                {users}
                            </h4>
                            <p className="box-text">
                                Active Users
                            </p>
                        </Link>
                        <Link className='box-btn'>
                            <FaHandHoldingDollar className='box-btn-icon' />
                            <h4 className="box-title">

                                $288
                            </h4>
                            <p className="box-text">
                                Total  Revenue
                            </p>
                        </Link>

                        <Link className='box-btn'>
                            <PiHandWithdraw className='box-btn-icon' />
                            <h4 className="box-title">
                                39
                            </h4>
                            <p className="box-text">
                                Total Orders
                            </p>
                        </Link>
                        <Link className='box-btn'>
                            <MdProductionQuantityLimits className='box-btn-icon' />
                            <h4 className="box-title">

                                {products}
                            </h4>
                            <p className="box-text">
                                Foods
                            </p>
                        </Link>
                        <Link className='box-btn'>
                            <FaShippingFast className='box-btn-icon' />
                            <h4 className="box-title">
                                44
                            </h4>
                            <p className="box-text">
                                Pending Orders

                            </p>
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminDash;
