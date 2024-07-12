import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Cart from './Cart';
import Order from './Order';
import AdminDashboard from './AdminDashboard';

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
