import React, { createContext, useEffect, useState } from 'react';

export const RestaurantContext = createContext();

export const RestaurantProvider = (props) => {
    const [data, setData] = useState({
        usuario: null,
        restaurante: null
    });

    // Carregar dados do localStorage
    useEffect(() => {
        const dataSalva = localStorage.getItem('data');
        if (dataSalva) {
            setData(JSON.parse(dataSalva));
        }
    }, []);

    useEffect(() => {
        if (data.restaurante != null && data.usuario != null) {
            localStorage.setItem('data', JSON.stringify(data));
        }

    }, [data]);

    const setUsuario = (usuario) => {
        setData(prevState => ({ ...prevState, usuario }));
    }

    const setRestaurante = (restaurante) => {
        setData(prevState => ({ ...prevState, restaurante }));
    }

    return (
        <RestaurantContext.Provider value={{ data, setUsuario, setRestaurante }}>
            {props.children}
        </RestaurantContext.Provider>
    );
};
