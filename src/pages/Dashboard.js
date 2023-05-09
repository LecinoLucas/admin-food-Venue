import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl mb-6">Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <Link
                    to="/add-dish"
                    className="bg-blue-500 text-white px-5 py-2 rounded"
                >
                    Add Dish
                </Link>
                <Link
                    to="/add-table"
                    className="bg-blue-500 text-white px-5 py-2 rounded"
                >
                    Add Table
                </Link>
                <Link
                    to="/manage-orders"
                    className="bg-blue-500 text-white px-5 py-2 rounded"
                >
                    Manage Orders
                </Link>
                <Link
                    to="/manage-reservations"
                    className="bg-blue-500 text-white px-5 py-2 rounded"
                >
                    Manage Reservations
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
