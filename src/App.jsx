import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Signup from './Signup/Signup';
import { Switch, Route } from 'react-router-dom';
import Signin from './Signup/Signin';
import CoinChart from './CoinChart/CoinChart';
import NavbarComponent from './Navbar/NavbarComponent';
const App = () => {
	const [input, setInput] = useState('');
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
		</>
	);
};

export default App;
