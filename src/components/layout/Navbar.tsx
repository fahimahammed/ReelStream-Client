import { LogOut, Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import Logo from "@/assets/Logo";
import { useUser } from "@/hooks/user";

const Navbar = () => {
    const { user, setIsLoading } = useUser();

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
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage
                                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <NavLink to="/profile">Profile</NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="bg-red-500 cursor-pointer"
                                    >
                                        <LogOut />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <NavLink to="/reel/upload">
                                <Button className="rounded-full">
                                    <Plus />
                                    Upload
                                </Button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <Button className="rounded">Login</Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button className="rounded">Register</Button>
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
