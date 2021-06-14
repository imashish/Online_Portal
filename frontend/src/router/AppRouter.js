import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/login';
import Register from '../components/register';
import Dashboard from '../components/dashboard';
import Home from '../components/home';

const OrderHistory = React.lazy(() => import('../components/orderHistory'));
const Cart = React.lazy(() => import('../components/cart'));
const Checkout = React.lazy(() => import('../components/checkout'));
const Logout = React.lazy(() => import('../components/logout'));

const AppRouter = () => {
	return (
		<div className="container mt-3">
			<Switch>
				<React.Suspense fallback={<div className="loader" />}>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/login" render={(props) => <Login {...props} />} />
					<Route exact path="/register" render={(props) => <Register {...props} />} />
					<Route exact path="/home" render={(props) => <Home {...props} />} />
					<Route exact path="/cart" render={(props) => <Cart {...props} />} />
					<Route exact path="/orderHistory" render={(props) => <OrderHistory {...props} />} />
					<Route exact path="/checkout" render={(props) => <Checkout {...props} />} />
					<Route exact path="/logout" render={(props) => <Logout {...props} />} />
				</React.Suspense>
				<Redirect to="/" />
			</Switch>
		</div>
	);
};

export default AppRouter;
