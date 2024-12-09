import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { FaBarsStaggered } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IoSearchOutline } from "react-icons/io5";
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const Transactions = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [allTransactions, setAllTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Authentication and Authorization
    useEffect(() => {
        const token = Cookies.get('token');
        const authData = Cookies.get('auth');
        if (!token || !authData) {
            navigate('/login');
            return;
        }

        try {
            const role = JSON.parse(authData)?.user?.role;
            if (role === 1) return; // Admin role
            if (role === 0) navigate('/dashboard/user'); // Regular user
            else navigate('/login');
        } catch {
            navigate('/login');
        }
    }, [navigate]);

    // Fetch Transactions
    useEffect(() => {
        const fetchTransactionsData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/transaction/transactions`);
                if (data?.success) {
                    const sortedTransactions = data.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setAllTransactions(sortedTransactions);
                    setFilteredTransactions(sortedTransactions);
                } else {
                    toast.error(data.message || ' No Transactions Found !');
                }
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        };

        fetchTransactionsData();
    }, []);

    // Handle Search
    useEffect(() => {
        const searchQuery = searchTerm.trim().toLowerCase();

        const filtered = searchQuery
            ? allTransactions.filter(transaction => {
                const userName = transaction.name?.toLowerCase() || '';
                const userEmail = transaction.email?.toLowerCase() || '';
                const amount = transaction.amount.toString();
                const transactionDate = new Date(transaction.date).toLocaleString().toLowerCase(); // Format the date to a string

                // Check if the search term is in username, email, amount, or date
                return (
                    userName.includes(searchQuery) ||
                    userEmail.includes(searchQuery) ||
                    amount.includes(searchQuery) ||
                    transactionDate.includes(searchQuery)
                );
            })
            : allTransactions;

        setFilteredTransactions(filtered);
    }, [searchTerm, allTransactions]);

    // Edit Transaction Handler (Implement as needed)
    const handleEdit = (transactionId) => {
        // Navigate to edit page or open modal
        navigate(`/transactions/edit/${transactionId}`);
    };

    // Delete Transaction Handler (Implement as needed)
    const handleDelete = async (transactionId) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) return;

        try {
            setLoading(true);
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/transaction/delete/${transactionId}`);

            if (data?.success) {
                toast.success(data.message);
                // Remove the deleted transaction from state
                setAllTransactions(prev => prev.filter(t => t._id !== transactionId));
                setFilteredTransactions(prev => prev.filter(t => t._id !== transactionId));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wrapper d-flex align-items-stretch">
            {loading && <Loader />}
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div id="content" className="px-2 pt-5">
                <button type="button" id="openSidebar" onClick={toggleSidebar} className="bars-btn">
                    <FaBarsStaggered />
                </button>

                <div className="search-add-main">
                    <div className="search-main">
                        <input
                            type="text"
                            className="search-inp"
                            placeholder="Search transactions by username or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="search-icon">
                            <IoSearchOutline />
                        </div>
                    </div>
                </div>

                <div className="tbl-main">
                    <table className="simple-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Payment Method</th>
                                <th>Sales Charge</th>
                                <th>Hedging Fee</th>
                                <th>Status</th>
                                {/* <th>Edit</th>
                                <th>Delete</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map(transaction => (
                                    <tr key={transaction._id}>
                                        <td>{new Date(transaction.date).toLocaleString()}</td>
                                        <td>{transaction.name}</td>
                                        <td>{transaction.email}</td>
                                        <td>{transaction.amount} {transaction.currency}</td>
                                        <td>{transaction.type}</td>
                                        <td>{transaction.paymentMethod}</td>
                                        <td>{Number.isInteger(transaction.salesFee) ? transaction.salesFee : transaction.salesFee.toFixed(2)}</td>
                                        <td>{Number.isInteger(transaction.hedgingFee) ? transaction.hedgingFee : transaction.hedgingFee.toFixed(2)}</td>
                                        <td className={`btn btn-sm ${transaction.status === 0 ? 'btn-warning' :
                                                transaction.status === 1 ? 'btn-success' :
                                                    transaction.status === 2 ? 'btn-danger' : ''
                                            }`}>
                                            {transaction.status === 0 ? 'Pending' :
                                                transaction.status === 1 ? 'Completed' :
                                                    transaction.status === 2 ? 'Failed' : 'Unknown'}
                                        </td>


                                        {/* <td>
                                            <button className='btn btn-primary' onClick={() => handleEdit(transaction._id)}>Edit</button>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => handleDelete(transaction._id)}>Delete</button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
