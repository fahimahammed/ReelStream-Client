import { Route, Routes } from "react-router";
import App from "../App";
import Home from "@/pages/Home";
import Register from "@/pages/Register";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    );
};

export default Routers;
