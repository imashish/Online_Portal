import React, { useState, useEffect } from 'react';
import ItemService from '../services/item';

const Cart = (props) => {
	const token = localStorage.getItem('token');
	const [ items, setItems ] = useState([]);
	useEffect(
		() => {
			if (token) {
				ItemService.getCartItems(token)
					.then((response) => {
						setItems(response.data.items);
						localStorage.setItem('cartId', response.data.items[0].cart_id);
						alert('Items in your cart: ' + JSON.stringify(response.data.items, null, 2));
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
			<h3>Items in your cart:</h3>
			{items.length ? (
				items.map((item) => {
					return (
						<div key={item._id} className="col-lg-6">
							Cart Id: {item.cart_id}
							<br />
							Item Id: {item.item_id}
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

export default Cart;
