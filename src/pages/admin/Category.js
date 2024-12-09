import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Categoryform from '../../form/Categoryform';
import { Modal } from "antd";
import Loader from '../../components/Loader';
import Sidebar from './Sidebar';
import { FaBarsStaggered } from 'react-icons/fa6';
import AdminNav from './AdminNav';
const Category = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedname, setUpdatedName] = useState("");

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };



    //handleForm 



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Please enter a category name.");
            return;
        }
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
            if (data?.success) {
                toast.success(`${name} Category is Created SuccessFully!!`);
                getAllCategory();
                setName(""); //input field will be cleared 
            } else {
                toast.error(data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong Input Form !!");
        }
    };
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
    //update category 
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {
                name: updatedname
            });
            if (data.success) {
                toast.success(data.message);
                setSelected(null);
                getAllCategory();
                setUpdatedName("");
                setVisible(false);
            } else { toast.error(data.message); }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };
    //handle delete 
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);
            if (data.success) {
                toast.success(data.message);
                getAllCategory();

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
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



                    <div className="container-fluid  p-2">
                        <div className="row">

                            <div className="col-md-12">
                                <h3> Categories</h3>
                                <div className="p-3">
                                    <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName} />
                                </div>
                                <div className="">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories?.map((c) => (
                                                <tr className='' key={c._id}>
                                                    <td>{c.name}</td>
                                                    <td>
                                                        <button className="btn btn-primary mx-2" onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c); }}>Edit</button>
                                                        <button className="btn btn-danger mx-2" onClick={() => handleDelete(c._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                                <Categoryform value={updatedname} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                            </Modal>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Category;




