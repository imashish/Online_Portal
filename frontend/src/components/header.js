import { Link } from 'react-router-dom';

const Header = () => {
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
	return (
		<header>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="container">
					<Link to={isLoggedIn ? '/home' : '/'} className="navbar-brand">
						A2Z SHOP
					</Link>
					{isLoggedIn ? (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={'/orderHistory'} className="nav-link">
									History
								</Link>
							</li>
							<li className="nav-item">
								<Link to={'/cart'} className="nav-link">
									<i className="fas fa-shopping-cart" /> Cart
								</Link>
							</li>
							<li className="nav-item">
								<Link to={'/checkout'} className="nav-link">
									Checkout
								</Link>
							</li>
							<li className="nav-item">
								<Link to={'/logout'} className="nav-link">
									Logout
								</Link>
							</li>
						</div>
					) : (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={'/login'} className="nav-link">
									Login
								</Link>
							</li>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
