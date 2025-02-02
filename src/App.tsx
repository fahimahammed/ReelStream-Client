import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </>
  );
}

export default App;
