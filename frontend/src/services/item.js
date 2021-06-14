import http from '../http-client/http-common';

class ItemService {
	getAllItems() {
		return http.get('/item/list');
	}

	addItemToCart(data, token) {
		return http.post('/cart/add', data, {
			headers: { Authorization: token }
		});
	}

	getCartItems(token) {
		return http.get('/cart/cartItems', {
			headers: { Authorization: token }
		});
	}

	checkoutOrder(token, cartId) {
		return http.post(
			`/cart/${cartId}/complete`,
			{},
			{
				headers: { Authorization: token }
			}
		);
	}
}

export default new ItemService();
