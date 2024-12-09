import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import AdminNav from "./AdminNav";
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const token = Cookies.get("token");
    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/orders/all-orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                }
                );
                if (data?.success) {
                    setOrders(data.orders);
                    setFilteredOrders(data.orders); // Initialize filteredOrders
                } else {
                    setOrders([]);
                    setFilteredOrders([]);
                    toast.error("No orders found.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Error fetching orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, []);

    // Handle search logic
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        if (value.trim() === "") {
            setFilteredOrders(orders); // Reset filter when input is empty
        } else {
            const filtered = orders.filter(
                (order) =>
                    order._id.toLowerCase().includes(value) ||
                    order.shippingInfo.email.toLowerCase().includes(value) ||
                    new Date(order.createdAt).toLocaleDateString().includes(value)
            );
            setFilteredOrders(filtered);
        }
    };

    return (
        <>
            <div className="wrapper d-flex align-items-stretch">
                {loading && <Loader />}

                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                {/* Page Content */}
                <div id="content" className="px-2">
                    <button type="button" id="openSidebar" onClick={toggleSidebar} className="bars-btn">
                        <FaBarsStaggered />
                    </button>
                    <AdminNav />
                    <div className="">
                        <h1 className="cart-title my-3">Admin Orders</h1>

                        {/* Search Section */}
                        <div className="search-main mb-4">
                            <input
                                type="text"
                                className="search-inp"
                                placeholder="Search by Order ID, Date, or Email"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        {/* Orders Table */}
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Email</th>
                                    <th>Total Price</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>{order.shippingInfo.email}</td>
                                            <td>${order.totalAmount.toFixed(2)}</td>
                                            <td><Link to={`/dashboard/admin/order/${order._id}`} className="btn btn-sm btn-primary">details</Link></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </>
    );
};

export default AdminOrders;
