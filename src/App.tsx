import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <h1>Hello ReelStream</h1>
    </>
  );
}

export default App;
