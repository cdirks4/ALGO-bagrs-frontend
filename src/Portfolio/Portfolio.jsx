import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as portApi from '../apiCalls/portfolioCalls';
import * as api from '../apiCalls/coingecko';
import { Container, Row, Col, Button } from 'react-bootstrap';

import PortfolioChart from '../Chart/PortfolioChart';
const Portfolio = ({ currentUser, portfolio }) => {
	const [target, setTarget] = useState(null);
	const [allCoins, setAllCoins] = useState();
	let arr = [];
	const getAllCoins = async (data) => {
		for (let i = 0; i < data.length; i++) {
			const num = await api.getCoinById(data[i].geckoId);
			arr.push(num);
		}
		return arr;
	};
	useEffect(() => {
		portfolio && getAllCoins(portfolio.coins).then((res) => setAllCoins(res));
	}, [portfolio]);

	return !currentUser ? (
		<h1>
			You must <Link to='/singin'>sign in</Link> to use this page
		</h1>
	) : (
		arr && (
			<>
				<PortfolioChart
					portfolio={portfolio}
					target={target}
					setTarget={setTarget}
				/>
				<Container className='border border-light mt-4 rounded'>
					<Row className='border-bottom d-flex align-items-center'>
						<Col>Coin</Col>
						<Col>Average Cost</Col>
						<Col>Shares</Col>
					</Row>
					{portfolio &&
						portfolio.coins.map((coin, i) => {
							return (
								<Row
									onClick={() => setTarget(coin.title)}
									className='border-bottom d-flex align-items-center'>
									<Col>{coin.title}</Col>
									<Col>{coin.ppc}</Col>
									<Col>{coin.shares && coin.shares.toFixed(3)}</Col>
									<Col>{allCoins[i].name}</Col>
								</Row>
							);
						})}
				</Container>
			</>
		)
	);
};

export default Portfolio;
