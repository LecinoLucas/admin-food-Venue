import React from 'react';

const ToggleButton = ({ isOpen, toggleOpen }) => {
    return (
        <button onClick={toggleOpen} className={`px-2 py-1 rounded ${isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {isOpen ? 'Aberto' : 'Fechado'}
        </button>
    );
};

export default ToggleButton;