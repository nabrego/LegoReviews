import { SignedIn, SignInButton, SignedOut, UserButton, SignUpButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
const handleHomeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = '/';
    };

    return (
        <header className="sticky top-0 w-full flex justify-between items-center bg-white shadow-md z-10">
            <nav className="h-16 px-4 flex justify-between items-center w-full">
                <div className="flex gap-4">
                    <Link 
                        to="/" 
                        onClick={handleHomeClick}
                        className="text-black font-medium hover:text-red-600"
                    >
                        Home
                    </Link>
                    <Link to="/rated-sets" className="text-black font-medium hover:text-red-600">Rated Sets</Link>
                </div>
                <div className="flex gap-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                </div>
            </nav>
        </header>
    );
};