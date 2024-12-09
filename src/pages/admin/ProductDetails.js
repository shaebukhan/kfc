import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBarsStaggered } from 'react-icons/fa6';
import axios from 'axios';
import AdminNav from './AdminNav';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Cookies from "js-cookie";
const ProductDetails = () => {
    const { id } = useParams();
    const token = Cookies.get("token");
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [product, setProduct] = useState({
        image: '',
        shortDescription: '',
        longDescription: '',
        stockCode: '',
        categoryCode: '',
        categoryName: '',
        subcategory: '',
        barcode: '',
        dbp: '',
        rrp: '',
        manufacturer: '',
        manufacturerSku: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        warranty: '',
        optionalAccessories: []
    });
    const [loading, setLoading] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/single-product/${id}`);
                if (data?.success) setProduct(data.product);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleAccessoriesChange = (e) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            optionalAccessories: e.target.value.split(',').map(item => item.trim())
        }));
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/single-product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (data?.success) {
                    setProduct(data.product);
                }
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async () => {
        setLoading(true);
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                toast.success("Product deleted successfully");
                navigate('/dashboard/admin/products');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete product. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="wrapper d-flex align-items-stretch">
                {loading && <Loader />}
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div id="content" className="px-2 pt-3">
                    <button type="button" onClick={toggleSidebar} className="bars-btn">
                        <FaBarsStaggered />
                    </button>
                    <AdminNav />
                    <div className="shadow-lg rounded-3 p-4 product-card-admin">
                        <div className="product-card-admin-left">
                            <img className="prod-image-admin" src={product.image} alt={product.shortDescription} />
                            <div className="mb-2">
                                <label htmlFor="image">Image URL</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={product.image}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    className="form-control my-2"
                                />
                            </div>
                        </div>

                        <div className="product-card-admin-right">
                            <div className="mb-2">
                                <label htmlFor="shortDescription">Short Description</label>
                                <textarea
                                    rows="4"
                                    id="shortDescription"
                                    name="shortDescription"
                                    value={product.shortDescription}
                                    onChange={handleInputChange}
                                    placeholder="Short Description"
                                    className="w-100 my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="longDescription">Long Description</label>
                                <textarea
                                    rows="20"
                                    id="longDescription"
                                    name="longDescription"
                                    value={product.longDescription}
                                    onChange={handleInputChange}
                                    placeholder="Long Description"
                                    className="w-100 my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="stockCode">Stock Code</label>
                                <input
                                    type="text"
                                    id="stockCode"
                                    name="stockCode"
                                    value={product.stockCode}
                                    onChange={handleInputChange}
                                    placeholder="Stock Code"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="categoryCode">Category Code</label>
                                <input
                                    type="text"
                                    id="categoryCode"
                                    name="categoryCode"
                                    value={product.categoryCode}
                                    onChange={handleInputChange}
                                    placeholder="Category Code"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="categoryName">Category Name</label>
                                <input
                                    type="text"
                                    id="categoryName"
                                    name="categoryName"
                                    value={product.categoryName}
                                    onChange={handleInputChange}
                                    placeholder="Category Name"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="subcategory">Subcategory</label>
                                <input
                                    type="text"
                                    id="subcategory"
                                    name="subcategory"
                                    value={product.subcategory}
                                    onChange={handleInputChange}
                                    placeholder="Subcategory"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="barcode">Barcode</label>
                                <input
                                    type="text"
                                    id="barcode"
                                    name="barcode"
                                    value={product.barcode}
                                    onChange={handleInputChange}
                                    placeholder="Barcode"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="dbp">Discounted Base Price</label>
                                <input
                                    type="text"
                                    id="dbp"
                                    name="dbp"
                                    value={product.dbp}
                                    onChange={handleInputChange}
                                    placeholder="Discounted Base Price"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="rrp">Recommended Retail Price</label>
                                <input
                                    type="text"
                                    id="rrp"
                                    name="rrp"
                                    value={product.rrp}
                                    onChange={handleInputChange}
                                    placeholder="Recommended Retail Price"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <input
                                    type="text"
                                    id="manufacturer"
                                    name="manufacturer"
                                    value={product.manufacturer}
                                    onChange={handleInputChange}
                                    placeholder="Manufacturer"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="manufacturerSku">Manufacturer SKU</label>
                                <input
                                    type="text"
                                    id="manufacturerSku"
                                    name="manufacturerSku"
                                    value={product.manufacturerSku}
                                    onChange={handleInputChange}
                                    placeholder="Manufacturer SKU"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="weight">Weight</label>
                                <input
                                    type="text"
                                    id="weight"
                                    name="weight"
                                    value={product.weight}
                                    onChange={handleInputChange}
                                    placeholder="Weight"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="length">Length</label>
                                <input
                                    type="text"
                                    id="length"
                                    name="length"
                                    value={product.length}
                                    onChange={handleInputChange}
                                    placeholder="Length"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="width">Width</label>
                                <input
                                    type="text"
                                    id="width"
                                    name="width"
                                    value={product.width}
                                    onChange={handleInputChange}
                                    placeholder="Width"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="height">Height</label>
                                <input
                                    type="text"
                                    id="height"
                                    name="height"
                                    value={product.height}
                                    onChange={handleInputChange}
                                    placeholder="Height"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="warranty">Warranty</label>
                                <input
                                    type="text"
                                    id="warranty"
                                    name="warranty"
                                    value={product.warranty}
                                    onChange={handleInputChange}
                                    placeholder="Warranty"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="optionalAccessories">Optional Accessories</label>
                                <input
                                    type="text"
                                    id="optionalAccessories"
                                    name="optionalAccessories"
                                    value={product.optionalAccessories.join(', ')}
                                    onChange={handleAccessoriesChange}
                                    placeholder="Optional Accessories (comma-separated)"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="mt-4">
                                <button className="btn btn-primary mx-3" type="button" onClick={handleUpdate}>Update</button>
                                <button className="btn btn-danger mx-3" type="button" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ProductDetails;
