import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import AddDish from '../pages/AddDish';
import AddTable from '../pages/AddTable';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login/Login';
import ManageOrders from '../pages/ManageOrders';
import ManageReservations from '../pages/ManageReservations';
import Signup from '../pages/Signup';
import Header from './Header';
import PrivateRoute from './PrivateRoute';

const CustomRoutes = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/' && <Header />}
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/add-dish" component={AddDish} />
                <PrivateRoute path="/add-table" component={AddTable} />
                <PrivateRoute path="/manage-orders" component={ManageOrders} />
                <PrivateRoute path="/manage-reservations" component={ManageReservations} />
            </Switch>
        </>
    );
};

export default CustomRoutes;
