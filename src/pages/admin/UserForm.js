import React from 'react';

const UserForm = ({ handleSubmit, userData, setUserData }) => {
    // Update form values on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {userData.id ? "Update User" : "Submit"}
                </button>
            </form>
        </>
    );
};

export default UserForm;
