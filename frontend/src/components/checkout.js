import React, { useEffect } from 'react';
import ItemService from '../services/item';

const Checkout = (props) => {
	const token = localStorage.getItem('token');
	const cartId = localStorage.getItem('cartId');
	useEffect(
		() => {
			if (token) {
				if (cartId && cartId !== 'null') {
					ItemService.checkoutOrder(token, cartId)
						.then((response) => {
							localStorage.setItem('cartId', 'null');
							alert('Order placed successfully.');
							props.history.push('/home');
						})
						.catch((e) => {
							alert(e.response.data.message);
							props.history.push('/home');
						});
				} else {
					alert('Please add items in your cart.');
					props.history.push('/home');
				}
			} else {
				alert('Please login to proceed.');
				props.history.push('/login');
			}
		},
		[ token, props.history, cartId ]
	);

	return (
		<div className="row pb-1 col-lg-6">
			<h3>Place your order:</h3>
		</div>
	);
};

export default Checkout;
