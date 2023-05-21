import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { RestaurantContext } from '../context/RestauranteContext';
import ProfileDropdown from './ProfileDropdown';
const Header = () => {
    const history = useHistory();
    const { data } = useContext(RestaurantContext);
    const loggout = () => {
        localStorage.removeItem('token'); // Remover o token de autenticação do localStorage
        history.push('/');
    }

    const restaurantName = data?.restaurante?.nome;
    return (
        <header className="bg-primary py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <NavLink
                        to="/pedidos"
                        className="text-white font-semibold text-xl"
                        activeClassName="font-bold"
                    >
                        FoodVenue Admin
                    </NavLink>
                    <div className="border-r border-white h-6"></div>
                    <NavLink
                        to="/pedidos"
                        className="text-white"
                        activeClassName="font-bold"
                    >
                        Pedidos
                    </NavLink>
                    <div className="border-r border-white h-6"></div>
                    <NavLink
                        to="/pratos"
                        className="text-white"
                        activeClassName="font-bold"
                    >
                        Pratos
                    </NavLink>
                    <div className="border-r border-white h-6"></div>
                    <NavLink
                        to="/mesas"
                        className="text-white"
                        activeClassName="font-bold"
                    >
                        Mesas
                    </NavLink>
                </div>
                <ProfileDropdown loggout={loggout} restaurantName={restaurantName} />
            </nav>
        </header>
    );
};

export default Header;
