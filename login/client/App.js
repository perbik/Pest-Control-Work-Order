import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import AdminDashboard from './components/Admin/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/cart" component={Cart} />
                <Route path="/order" component={Order} />
                <Route path="/admin" component={AdminDashboard} />
            </Switch>
        </Router>
    );
};

export default App;
