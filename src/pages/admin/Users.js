import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import AdminNav from "./AdminNav";
import Cookies from "js-cookie";
const Users = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 1-based index
    const itemsPerPage = 20;

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const token = Cookies.get("token");
    // Fetch users
    const fetchUsers = async (page = 1, keyword = "") => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-users`, {
                params: { page, limit: itemsPerPage, search: keyword.trim() },
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setUsers(data.results);
                setTotalPages(data.totalPages);
            } else {
                setUsers([]);
                setTotalPages(0);
                toast.error("No users found.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    // Initial load and update on page or search term change
    useEffect(() => {
        fetchUsers(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to the first page
        fetchUsers(1, searchTerm.trim());
    };

    // Handle page change
    const handlePageClick = ({ selected }) => setCurrentPage(selected + 1);


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/auth/delete-user/${id}`);
            if (data.success) {
                toast.success(data.message);
                fetchUsers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting food item:", error);
            toast.error("Failed to delete food item");
        }
    };

    return (
        <div className="wrapper d-flex align-items-stretch">
            {loading && <Loader />}
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div id="content" className="pt-3">
                <button type="button" id="openSidebar" onClick={toggleSidebar} className="bars-btn">
                    <FaBarsStaggered />
                </button>
                <AdminNav />
                <h2 className="b-clr">All Users</h2>

                {/* Search Section */}
                <div className="search-add-main">
                    <form className="d-flex align-items-center gap-3" onSubmit={handleSearchSubmit}>
                        <div className="search-main">
                            <input
                                type="text"
                                className="search-inp"
                                placeholder="Search by name email"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="search-icon">
                                <IoSearchOutline />
                            </div>
                        </div>
                        <button className="btn   btn-primary" type="submit">
                            Search
                        </button>
                    </form>


                </div>

                {/* Product Table */}
                <div className="tbl-main">
                    <table className="simple-table">
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.status}</td>
                                        <td>
                                            <Link
                                                className="btn btn-primary"
                                                to={`/dashboard/admin/edit-user/${user._id}`}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No Users Found</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="table-footer">
                                <td colSpan="6">
                                    <div className="pagination-container">
                                        <span className="page-info">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <ReactPaginate
                                            previousLabel="Previous"
                                            nextLabel="Next"
                                            onPageChange={handlePageClick}
                                            pageCount={totalPages}
                                            containerClassName="pagination"
                                            activeClassName="active"
                                            forcePage={currentPage - 1}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
