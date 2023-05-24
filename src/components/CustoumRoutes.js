import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import AddDish from '../pages/AddDish';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login/Login';
import NotFoundPage from '../pages/NotFounderPage';
import RestaurantProfilePage from '../pages/Profile';
import Register from '../pages/Register/Register';
import Header from './Header';
import PrivateRoute from './PrivateRoute';

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null;
}

const CustomRoutes = () => {
    const location = useLocation();
    const isAuthenticated = isLoggedIn();

    return (
        <>
            {location.pathname !== '/' && location.pathname !== '/cadastro' && <Header />}
            <Switch>
                <Route path="/" exact render={() => (
                    isAuthenticated ? (
                        <Redirect to="/pedidos" />
                    ) : (
                        <Login />
                    )
                )} />
                <Route path="/cadastro" component={Register} />
                <PrivateRoute path="/pedidos" component={Dashboard} />
                <PrivateRoute path="/pratos" component={AddDish} />
                <PrivateRoute path="/perfil" component={RestaurantProfilePage} />
                <PrivateRoute path="/manage-reservations" component={Dashboard} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    );
};

export default CustomRoutes;
