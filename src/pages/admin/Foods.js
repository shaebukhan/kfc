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

const Foods = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 1-based index
    const itemsPerPage = 20;

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Fetch products data
    const fetchFoods = async (page = 1, keyword = "") => {
        setLoading(true);
        try {
            const endpoint = keyword.trim()
                ? `search/${keyword.trim()}`
                : "get-foods";

            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/food/${endpoint}`,
                { params: { page, limit: itemsPerPage } }
            );

            if (data) {
                setFoods(data.results || data.foods);
                setTotalPages(data.totalPages || 0);
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
        fetchFoods(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to the first page
        fetchFoods(1, searchTerm.trim());
    };

    // Handle page change
    const handlePageClick = ({ selected }) => setCurrentPage(selected + 1);


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this food item?");
        if (!confirmDelete) return;

        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/food/delete-food/${id}`);
            if (data.success) {
                toast.success(data.message);
                fetchFoods();
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
                <h2 className="b-clr">All Foods</h2>

                {/* Search Section */}
                <div className="search-add-main">
                    <form className="d-flex align-items-center gap-3" onSubmit={handleSearchSubmit}>
                        <div className="search-main">
                            <input
                                type="text"
                                className="search-inp"
                                placeholder="Search by name, category, price"
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

                    <div className="d-flex">
                        <Link className="btn btn-primary" to="/dashboard/admin/add-food">Add Food</Link>
                    </div>
                </div>

                {/* Product Table */}
                <div className="tbl-main">
                    <table className="simple-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th className="prod-title">Title</th>
                                <th>Price</th>
                                <th>discount</th>
                                <th>sale Price</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods?.length > 0 ? (
                                foods.map((food) => (
                                    <tr key={food._id}>
                                        <td>{food.category}</td>
                                        <td>{food.title}</td>
                                        <td>${food.price}</td>
                                        <td>{food.discount}%</td>
                                        <td>${food.sprice}</td>
                                        <td>
                                            <img
                                                style={{ height: "100px", width: "100px" }}
                                                src={food.images[0]}
                                                alt=""
                                            />
                                        </td>
                                        <td>
                                            <Link
                                                className="btn btn-primary"
                                                to={`/dashboard/admin/edit-food/${food._id}`}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(food._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No Foods Found</td>
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

export default Foods;
