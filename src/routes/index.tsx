import { Route, Routes } from "react-router";
import App from "../App";

const Routers = () => {
    return (
        <Routes>
            <Route path="/home" element={<App />}>
            </Route>
        </Routes>
    );
};

export default Routers;
