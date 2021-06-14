import React, { useEffect } from 'react';

const Logout = (props) => {
	useEffect(
		() => {
			localStorage.clear();
			props.history.push('/');
			window.location.reload();
		},
		[ props.history ]
	);

	return <div />;
};

export default Logout;
