

import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AdminRoute, PrivateRoute, PublicRoute } from "./routes/AuthRoute";
import AdminDash from "./pages/admin/AdminDash";
import UserDashboard from "./pages/user/UserDashboard";
import Add from "./pages/auth/Add";
import Foods from "./pages/admin/Foods";
import Category from "./pages/admin/Category";
import AddFood from "./pages/admin/AddFood";
import EditFood from "./pages/admin/EditFood";
import Users from "./pages/admin/Users";
import AdminProfile from "./pages/admin/AdminProfile";
import EditUser from "./pages/admin/EditUser";

const App = () => {
  return (
    <>

      <Routes>
        {/* Public Routes */}

        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard/user"
          element={<PrivateRoute> <UserDashboard /> </PrivateRoute>}
        />

        {/* admin */}
        <Route path="/dashboard/admin" element={<AdminRoute><AdminDash /></AdminRoute>} />
        <Route path="/dashboard/admin/foods" element={<AdminRoute><Foods /></AdminRoute>} />
        <Route path="/dashboard/admin/add-food" element={<AdminRoute><AddFood /></AdminRoute>} />
        <Route path="/dashboard/admin/edit-food/:foodId" element={<AdminRoute><EditFood /></AdminRoute>} />
        <Route path="/dashboard/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/dashboard/admin/profile" element={<AdminRoute><AdminProfile /></AdminRoute>} />
        <Route path="/dashboard/admin/edit-user/:id" element={<AdminRoute><EditUser /></AdminRoute>} />
        <Route path="/dashboard/admin/category" element={<AdminRoute><Category /></AdminRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
};

export default App;