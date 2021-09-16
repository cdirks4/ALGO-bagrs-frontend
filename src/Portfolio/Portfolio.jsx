import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as portApi from '../apiCalls/portfolioCalls';
import * as api from '../apiCalls/coingecko';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { Doughnut, Line } from 'react-chartjs-2';
import PortfolioChart from '../Chart/PortfolioChart';
const Portfolio = ({ currentUser, setCurrentUser }) => {
	const [portfolio, setPortfolio] = useState(null);
	const [target, setTarget] = useState(null);
	const auth = getAuth();

	auth.onAuthStateChanged((user) => {
		user ? setCurrentUser(user) : setCurrentUser(null);
	});

	useEffect(() => {
		currentUser &&
			portApi.showPortfolio(currentUser.uid).then((res) => setPortfolio(res));
	}, [currentUser]);

	return !currentUser ? (
		<h1>
			You must <Link to='/singin'>sign in</Link> to use this page
		</h1>
	) : (
		<>
			<PortfolioChart
				portfolio={portfolio}
				target={target}
				setTarget={setTarget}
			/>
			<Container className='border border-light mt-4 rounded'>
				<Row className='border-bottom d-flex align-items-center'>
					<Col></Col>
				</Row>
				{portfolio &&
					portfolio.coins.map((coin) => {
						return (
							<Row onClick={() => setTarget(coin.title)}>
								<Col>{coin.title}</Col>
								<Col>{coin.ppc}</Col>
								<Col>{coin.shares && coin.shares.toFixed(3)}</Col>
							</Row>
						);
					})}
			</Container>
		</>
	);
};

export default Portfolio;
