import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Signup from './Signup/Signup';
import { Switch, Route } from 'react-router-dom';
import Signin from './Signup/Signin';
import CoinChart from './CoinChart/CoinChart';
import NavbarComponent from './Navbar/NavbarComponent';
import Portfolio from './Portfolio/Portfolio';
import { getAuth } from 'firebase/auth';
import CoinDetails from './CoinDetails/CoinDetails';
import * as portApi from './apiCalls/portfolioCalls';
const App = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const [input, setInput] = useState('');
	const auth = getAuth();
	const [portfolio, setPortfolio] = useState();
	auth.onAuthStateChanged((user) => {
		user ? setCurrentUser(user) : setCurrentUser(null);
	});
	useEffect(() => {
		currentUser &&
			portApi.showPortfolio(currentUser.uid).then((res) => setPortfolio(res));
	}, [currentUser]);
	return (
		<>
			<Switch>
				<Route path='/'>
					<NavbarComponent input={input} setInput={setInput} />
				</Route>
			</Switch>
			<Switch>
				<Route path='/coinchart'>
					<CoinChart input={input} />
				</Route>
			</Switch>
			<Switch>
				<Route exact path='/'>
					<Container
						className='d-flex align-items-center justify-content-center'
						style={{ minHeight: '100vh' }}>
						<div
							className='w-100'
							style={{ maxWidth: '400px', minHeight: '500px' }}>
							<Signup />
						</div>
					</Container>
				</Route>
			</Switch>
			<Switch>
				<Route path='/signin'>
					<Container
						className='d-flex align-items-center justify-content-center'
						style={{ minHeight: '100vh' }}>
						<div
							className='w-100'
							style={{ maxWidth: '400px', minHeight: '500px' }}>
							<Signin />
						</div>
					</Container>
				</Route>
			</Switch>
			<Switch>
				<Route path='/portfolio'>
					<Portfolio
						currentUser={currentUser}
						setCurrentUser={setCurrentUser}
						portfolio={portfolio}
						setPortfolio={setPortfolio}
					/>
				</Route>
			</Switch>
			<Switch>
				<Route exact path='/details/:id'>
					<CoinDetails />
				</Route>
			</Switch>
		</>
	);
};

export default App;
