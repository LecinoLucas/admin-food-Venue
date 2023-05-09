import React, { useState } from 'react';
import foodVenueLogo from '../../images/foodVenueLogo.jpg';
import loginImage from '../../images/loginImage.jpg';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implemente a lógica de login aqui
    };

    return (
        <div id='main' className="relative h-screen flex" style={{ backgroundImage: `url(${loginImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div id="itemContainer" className="w-full flex justify-end mr-0">
                <div id='leftItems' className="w-full h-1/2  flex justify-center items-center">
                    <div className="p-5 mt-4 w-3/4">
                        <div className="text-start text-3xl">
                            <p className="text-white font-bold">Expanda seu negócio com Food Venue!</p>
                            <p className="text-white text-2xl">Cadastre seu restaurante agora e ofereça delivery <br /> e reserva de mesas através do nosso sistema</p>
                            <div className='w-full mt-4 flex'>
                                <button
                                    id='buttonRegister'
                                    type="submit"
                                    className="bg-highlight w-1/2 text-white p-3 text-2xl rounded w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    Cadastre-se aqui!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='loginForm' className="p-24 shadow-lg min-h-full flex flex-col justify-center max-w-md my-auto bg-white bg-opacity-95">
                    <div className="flex flex-col items-center mb-8">
                        <img src={foodVenueLogo} alt="Food Venue Logo" className="w-54 rounded-full" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1 text-highlight font-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-secondary block mb-1 font-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white px-5 py-2 rounded w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Login
                        </button>
                        <p className='mt-2 text-secondary block mb-1 font-semibold'> <button className='hover:text-blue-700 focus:outline-none'> Esqueceu sua senha?</button></p>
                        <div id="registerMobile" className='mt-6 hidden'>
                            <p className="text-secondary font-bold">Ainda não nos conhece? <br />Expanda seu negócio com Food Venue!</p>
                            <button
                                type="submit"
                                className="bg-primary mt-5 text-white px-5 py-2 rounded w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Cadastre-se
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
