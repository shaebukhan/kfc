

import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AdminRoute, PublicRoute } from "./routes/AuthRoute";
import AdminDash from "./pages/auth/Dashboard";
import About from "./pages/home/About";
import Add from "./pages/auth/Add";
import Renovation from "./pages/home/Renovation";
import Services from "./pages/home/Services";
import ContactMain from "./pages/home/ContactMain";


const App = () => {




  return (
    <>

      <Routes>
        {/* Public Routes */}

        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/renovation" element={<Renovation />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactMain />} />
        <Route path="/about" element={<About />} /> */}
        <Route path="/" element={<Home />} />



        {/* <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />


        {/* admin */}
        {/* <Route path="/dashboard/admin" element={<AdminRoute><AdminDash /></AdminRoute>} />
        <Route path="/dashboard/admin/add" element={<AdminRoute><Add /></AdminRoute>} />  

        <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </>
  );
};

export default App;