import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import NoPage from "./components/pages/Nopage/NoPage";
import ProfilePictureCropper from "./components/pages/Profile Edit/ProfilePictureCropper";
import BuySell from "./components/pages/BuySell/Buysell";
import Search from "./components/pages/Search/Search";
import Tutorial from "./components/pages/Tutorial/Tutorial";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Login/Register";
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected Routes */}
            <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Home />} />
                <Route path="Trade" element={<BuySell />} />
                <Route path="About" element={<About />} />
                <Route path="Search" element={<Search />} />
                <Route path="Tutorial" element={<Tutorial />} />
                <Route path="Contact" element={<Contact />} />
                <Route path="Profile" element={<ProfilePictureCropper />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}

export default App;
