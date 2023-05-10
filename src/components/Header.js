import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';


const Header = () => {
    const history = useHistory();
    const loggout = () => {
        localStorage.removeItem('token'); // Remover o token de autenticação do localStorage
        history.push('/');
    }
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
                    <div
                        onClick={loggout}
                        className="text-white cursor-pointer"
                    >
                        Sair
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
