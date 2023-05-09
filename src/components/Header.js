import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <NavLink
                    to="/"
                    className="text-white font-semibold text-xl"
                >
                    FoodVenue Admin
                </NavLink>
                <div className="flex space-x-4">
                    <NavLink
                        to="/login"
                        activeClassName="text-blue-300"
                        className="text-white"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        activeClassName="text-blue-300"
                        className="text-white"
                    >
                        Signup
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;
