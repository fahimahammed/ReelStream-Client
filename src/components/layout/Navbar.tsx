import { LogOut, Video } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/services/auth.api";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { useUser } from "@/hooks/user";
import Logo from "@/assets/Logo";

const Navbar = () => {
    const { user, setIsLoading } = useUser();
    // console.log(user)

    const handleLogout = () => {
        logout();
        setIsLoading(true);
    };

    return (
        <header className="border-b-2 border-white/20 w-full">
            <div className="container flex justify-between items-center mx-auto h-16 px-5">
                <NavLink to="/">
                    <h1 className="text-xl font-black flex items-center">
                        <Logo width={30} fill="#fff" className="mr-1" /> Reel Stream
                    </h1>
                </NavLink>
                <nav className="flex gap-2 items-center">
                    {user ? (
                        <>
                            <NavLink to="/video/upload">
                                <Button className="rounded">
                                    <Video />
                                    Upload Reel
                                </Button>
                            </NavLink>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="link" className="text-white">
                                        {user?.email}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <NavLink to="/profile">View Profile</NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="bg-red-500 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        <LogOut />
                                        <span>Sign Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>


                        </>
                    ) : (
                        <NavLink to="/login">
                            <Button className="rounded-full">Sign In</Button>
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>

    );
};

export default Navbar;
