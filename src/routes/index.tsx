import { Route, Routes } from "react-router";
import App from "../App";
import Home from "@/pages/Home";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
};

export default Routers;
