import { Route, Routes } from "react-router";
import App from "../App";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ProfilePage from "@/pages/Profile";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={

                        <ProfilePage />

                    }
                />
            </Route>
        </Routes>
    );
};

export default Routers;
