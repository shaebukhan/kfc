import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";
import AdminNav from "./AdminNav";
import Loader from "../../components/Loader";
import { MdDeleteOutline } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";

const EditFood = () => {
    const { foodId } = useParams(); // Get food ID from the URL
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        discount: "",
        category: "",
    });
    const [oldImages, setOldImages] = useState([]); // Existing images
    const [imagesToRemove, setImagesToRemove] = useState([]); // Images to delete
    const [newImages, setNewImages] = useState([]); // Newly uploaded image files
    const [newImagePreviews, setNewImagePreviews] = useState([]); // Previews for new images

    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Fetch all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) setCategories(data?.category);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch categories!");
        }
    };

    // Fetch existing food data
    const getFoodDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/food/single-food/${foodId}`);
            if (data?.success) {
                const food = data.food;
                setFormData({
                    title: food.title,
                    description: food.description,
                    price: food.price,
                    discount: food.discount,
                    category: food.category,
                });
                setOldImages(food.images || []); // Preload existing images
            } else {
                toast.error("Failed to fetch food details!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while fetching food details!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategory();
        getFoodDetails();
    }, [foodId]);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle new image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setNewImages((prev) => [...prev, ...files]);
        const previews = files.map((file) => URL.createObjectURL(file));
        setNewImagePreviews((prev) => [...prev, ...previews]);
    };

    // Remove old image
    const handleRemoveOldImage = (index) => {
        const removedImage = oldImages[index];
        setImagesToRemove((prev) => [...prev, removedImage]); // Flag for deletion
        setOldImages((prev) => prev.filter((_, i) => i !== index));
    };

    // Remove new image
    const handleRemoveNewImage = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
        setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("discount", formData.discount);
            data.append("category", formData.category);

            // Add remaining old images
            oldImages.forEach((url) => {
                data.append("existingImages", url);
            });

            // Add new images
            newImages.forEach((image) => {
                data.append("newImages", image);
            });

            // Add images flagged for deletion
            imagesToRemove.forEach((url) => {
                data.append("imagesToRemove", url);
            });

            const response = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/food/update-food/${foodId}`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response?.data?.success) {
                toast.success(response.data.message);
                navigate("/dashboard/admin/foods");
            } else {
                toast.error(response?.data?.message || "Failed to update food item");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating the food item!");
        } finally {
            setLoading(false);
        }
    };


    return (
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
                            <h3>Edit Food</h3>
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
                                    <label className="form-label">Existing Images</label>
                                    <div className="d-flex gap-4 mt-3">
                                        {oldImages.map((url, index) => (
                                            <div key={index} className="image-preview">
                                                <div className="position-relative">
                                                    <img src={url} alt="Existing" className="img-thumbnail" />
                                                    <button
                                                        type="button"
                                                        className="delete-thumb-btn"
                                                        onClick={() => handleRemoveOldImage(index)}
                                                    >
                                                        <MdDeleteOutline />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Images</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                    <div className="d-flex gap-4 mt-3">
                                        {newImagePreviews.map((preview, index) => (
                                            <div key={index} className="image-preview">
                                                <div className="position-relative">
                                                    <img src={preview} alt="New" className="img-thumbnail" />
                                                    <button
                                                        type="button"
                                                        className="delete-thumb-btn"
                                                        onClick={() => handleRemoveNewImage(index)}
                                                    >
                                                        <MdDeleteOutline />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Update Food
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditFood;
