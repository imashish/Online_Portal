import React, { useState, useEffect } from 'react';
import ItemService from '../services/item';

const Home = (props) => {
	const token = localStorage.getItem('token');
	const [ items, setItems ] = useState([]);
	useEffect(() => {
		ItemService.getAllItems()
			.then((response) => {
				setItems(response.data.items);
			})
			.catch((e) => alert(e.response.data.message));
	}, []);

	const addToCart = (item) => {
		if (token) {
			const data = JSON.stringify({ item_id: item._id });
			ItemService.addItemToCart(data, token)
				.then((response) => {
					alert('Item added to the cart successfully!');
				})
				.catch((e) => alert(e.response.data.message));
		} else {
			alert('Please login to proceed.');
			props.history.push('/login');
		}
	};

	return (
		<div className="row pb-1 col-lg-4">
			<h3>Available items in the store:</h3>
			{items.length &&
				items.map((item) => {
					return (
						<div key={item._id} className="col-lg-3">
							<button type="button" className="btn btn-link" onClick={() => addToCart(item)}>
								{item.name}
							</button>
						</div>
					);
				})}
		</div>
	);
};

export default Home;
