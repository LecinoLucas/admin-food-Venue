import React from 'react';
import { Link } from 'react-router-dom';

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null;
}

const NotFoundPage = () => {
    const isAuthenticated = isLoggedIn();

    return (
        <div style={{ height: 'calc(100vh - 4rem)' }} className={`flex flex-col items-center justify-center bg-app p-4 ${isAuthenticated ? 'h-[calc(100vh - 4rem)] overflow-auto' : 'h-screen'}`}>
            <div className="text-primary text-9xl mb-2">
                <i className="material-icons-outlined">report_problem</i>
            </div>
            <h2 className="text-5xl text-primary mb-2">Oops!</h2>
            <h5 className="text-xl text-primary mb-4">Parece que a página que você está procurando não existe...</h5>
            <Link
                to="/"
                className="bg-primary text-white py-2 px-4 rounded hover:bg-highlight transition-colors"
            >
                Voltar para o Início
            </Link>
        </div>
    );
};

export default NotFoundPage;
