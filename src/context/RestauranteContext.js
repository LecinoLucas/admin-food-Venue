import React, { createContext, useEffect, useReducer, useState } from 'react';

export const RestaurantContext = createContext();

export const RestaurantProvider = (props) => {
    const [data, setData] = useState({
        usuario: null,
        restaurante: null
    });

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const stringToBlob = (string) => {
        const byteCharacters = atob(string);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays);
    };

    useEffect(() => {
        const dataSalva = localStorage.getItem('data');
        if (dataSalva) {
            setData(JSON.parse(dataSalva));
        }
    }, []);

    const restauranteComBlobToString = (restaurante) => {
        if (restaurante && restaurante.imagem && restaurante.imagem.binaryStream) {
            const blob = stringToBlob(restaurante.imagem.binaryStream);
            const blobString = URL.createObjectURL(blob);
            return { ...restaurante, imagem: blobString };
        }

        return restaurante;
    };

    const setUsuario = (usuario) => {
        const newData = { ...data, usuario };
        setData(newData);
        localStorage.setItem('data', JSON.stringify(newData));
    };

    const setRestaurante = (restaurante) => {
        const restauranteComBlob = restauranteComBlobToString(restaurante);
        const newData = { ...data, restaurante: restauranteComBlob };
        setData(newData);
        localStorage.setItem('data', JSON.stringify(newData));
        forceUpdate();
    };

    return (
        <RestaurantContext.Provider value={{ data, setUsuario, setRestaurante }}>
            {props.children}
        </RestaurantContext.Provider>
    );
};
