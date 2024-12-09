import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from './Sidebar';
import { FaBarsStaggered } from 'react-icons/fa6';
import AdminNav from './AdminNav';
import Loader from '../../components/Loader';
import { MdDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        discount: '',
        category: '',
    });
    const [images, setImages] = useState([]); // For storing image files
    const [imagePreviews, setImagePreviews] = useState([]); // For storing image previews

    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Fetch all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while fetching categories!');
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Update images state
        setImages((prev) => [...prev, ...files]);

        // Generate previews for new images
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    // Remove image
    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);

        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('discount', formData.discount);
            data.append('category', formData.category);

            images.forEach((image) => {
                data.append('images', image);
            });

            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/food/add`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response?.data?.success) {
                toast.success(response.data.message);
                setFormData({ title: '', description: '', price: '', discount: '', category: '' });
                setImages([]);
                setImagePreviews([]);
                navigate("/dashboard/admin/foods");
            } else {
                toast.error(response?.data?.message || 'Failed to add food item');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong while adding the food item!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="wrapper d-flex align-items-stretch">
                {loading && <Loader />}
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div id="content" className="px-2">
                    <button type="button" id="openSidebar" onClick={toggleSidebar} className="bars-btn">
                        <FaBarsStaggered />
                    </button>
                    <AdminNav />
                    <div className="container-fluid p-2">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Add Food</h3>
                                <form onSubmit={handleSubmit} className="mt-3">
                                    <div className="mb-3">
                                        <label className="form-label">Category</label>
                                        <select
                                            className="form-control"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat.name}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            cols={"5"}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Discount (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="discount"
                                            value={formData.discount}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Images</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="images"
                                            multiple
                                            onChange={handleImageChange}
                                        />
                                        <div className="d-flex gap-4 mt-3">
                                            {imagePreviews.map((preview, index) => (
                                                <div key={index} className="image-preview">
                                                    <div className=" position-relative">
                                                        <img src={preview} alt="Selected" className="img-thumbnail" />
                                                        <button
                                                            type="button"
                                                            className="delete-thumb-btn"
                                                            onClick={() => handleRemoveImage(index)}
                                                        >
                                                            <MdDeleteOutline />
                                                        </button>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Add Food
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddFood;
