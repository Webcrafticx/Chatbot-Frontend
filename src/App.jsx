// App.js
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminQuestion from "./pages/admin/AdminQuestion";
import Login from "./pages/Login";
import HomePage from "./components/home/section/HomePage";
const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/:slug?" element={<Home />} />
                <Route
                    path="/register-user"
                    element={<SuperAdminDashboard />}
                />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/add-question" element={<AdminQuestion />} />
                <Route path="/login" element={<Login />} />
                <Route path="/landingpage" element={<HomePage />} />
            </Routes>
        </div>
    );
};

export default App;
