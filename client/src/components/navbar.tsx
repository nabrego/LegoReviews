import { SignedIn, SignInButton, SignedOut, UserButton, SignUpButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <header className="sticky top-0 w-full flex justify-between items-center bg-white shadow-md z-10">
            <nav className="p-4 flex justify-between items-center w-full">
                <div className="flex gap-4">
                    <Link to="/" className="text-black font-medium hover:text-blue-500">Home</Link>
                    <Link to="/rated-sets" className="text-black font-medium hover:text-blue-500">Rated Sets</Link>
                </div>
                <div className="flex gap-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </SignedOut>
                </div>
            </nav>
        </header>
    );
};