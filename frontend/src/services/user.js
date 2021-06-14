import http from '../http-client/http-common';

class UserService {
	createUser(data) {
		return http.post('/user/create', data);
	}

	login(data) {
		return http.post('/user/login', data);
	}

	getOrderHistory(token) {
		return http.get('/order/orderHistory', {
			headers: { Authorization: token }
		});
	}

	logoutSession(token) {
		return http.get('/user/logout', {
			headers: { Authorization: token }
		});
	}
}

export default new UserService();
