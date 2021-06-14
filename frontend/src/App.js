import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header';
import AppRouter from './router/AppRouter';
import Footer from './components/footer';

function App() {
	return (
		<React.Fragment>
			<Header />
			<main>
				<div className="container">
					<AppRouter />
				</div>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
