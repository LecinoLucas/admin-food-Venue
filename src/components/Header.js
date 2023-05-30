import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { RestaurantContext } from '../context/RestauranteContext';
import ProfileDropdown from './ProfileDropdown';
const Header = () => {
    const history = useHistory();
    const { data, forceUpdate } = useContext(RestaurantContext);
    const [nome, setNome] = useState('')
    const loggout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }


    useEffect(() => {
        setNome(data?.restaurante?.nome)
    }, [data?.restaurante, forceUpdate])

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
                        to="/perfil"
                        className="text-white"
                        activeClassName="font-bold"
                    >
                        Perfil
                    </NavLink>
                    <div className="border-r border-white h-6"></div>
                    <NavLink
                        to="/relatorio"
                        className="text-white"
                        activeClassName="font-bold"
                    >
                        Relatório
                    </NavLink>
                </div>
                <ProfileDropdown loggout={loggout} restaurantName={nome} />
            </nav>
        </header>
    );
};

export default Header;
