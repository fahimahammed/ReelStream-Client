import Logo from "@/assets/Logo";
import { NavLink } from "react-router";

const Navbar = () => {

    return (
        <header className="border-b-2 border-white/20 w-full">
            <div className="container flex justify-between items-center mx-auto h-16 px-5">
                <NavLink to="/">
                    <h1 className="text-xl font-black flex items-center">
                        <Logo width={30} fill="#fff" className="mr-1" /> Reel Stream
                    </h1>
                </NavLink>
                <nav className="flex gap-2 items-center">
                    Hello
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
