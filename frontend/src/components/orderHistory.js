import React, { useState, useEffect } from 'react';
import UserService from '../services/user';

const OrderHistory = (props) => {
	const token = localStorage.getItem('token');
	const [ orders, setOrders ] = useState([]);
	useEffect(
		() => {
			if (token) {
				UserService.getOrderHistory(token)
					.then((response) => {
						setOrders(response.data.ordersPlaced);
						alert('Orders Placed: ' + JSON.stringify(response.data.ordersPlaced, null, 2));
					})
					.catch((e) => alert(e.response.data.message));
			} else {
				alert('Please login to proceed.');
				props.history.push('/login');
			}
		},
		[ token, props.history ]
	);

	return (
		<div className="row pb-1 col-lg-6">
			<h3>Orders Placed:</h3>
			{orders.length ? (
				orders.map((item) => {
					return (
						<div key={item._id} className="col-lg-6">
							User Id: {item.user_id}
							<br />
							Cart Id: {item.cart_id}
							<hr />
						</div>
					);
				})
			) : (
				''
			)}
		</div>
	);
};

export default OrderHistory;
