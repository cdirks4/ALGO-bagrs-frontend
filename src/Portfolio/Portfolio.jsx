import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as portApi from '../apiCalls/portfolioCalls';
import * as api from '../apiCalls/coingecko';
import { Container, Row, Col, Button } from 'react-bootstrap';

import PortfolioChart from '../Chart/PortfolioChart';
const Portfolio = ({ currentUser, allCoins, setAllCoins }) => {
	const [target, setTarget] = useState(null);

	const [portfolio, setPortfolio] = useState();
	let arr = [];
	const getAllCoins = async (data) => {
		for (let i = 0; i < data.length; i++) {
			const num = await api.getCoinById(data[i].geckoId);
			arr.push(num);
		}
		return arr;
	};
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
			<Container className='border border-secondary mt-4 rounded'>
				<Row className='border-bottom d-flex align-items-center'>
					<Col></Col>
					<Col></Col>
					<Col>Average Cost</Col>
					<Col>Shares</Col>
					<Col>Market Value</Col>
					<Col>24hr high</Col>
				</Row>
				{portfolio &&
					portfolio.coins.map((coin, i) => {
						return (
							<Row
								onClick={() => setTarget(coin.title)}
								className='border-bottom d-flex align-items-center'>
								<Col>
									<img
										src={allCoins && allCoins[i].image?.small}
										alt={allCoins && allCoins[i].name}
										className='logo'
									/>
								</Col>
								<Col>{allCoins && allCoins[i].symbol.toUpperCase()}</Col>
								<Col
									style={{
										color:
											allCoins &&
											allCoins[i].market_data.current_price > coin.ppc
												? 'green'
												: 'red',
									}}>
									{coin.ppc}
								</Col>
								<Col>{coin.shares && coin.shares.toFixed(3)}</Col>
								<Col>
									{allCoins &&
										`$${(
											allCoins[i].market_data.current_price.usd * coin.shares
										).toFixed(2)}`}
								</Col>

								<Col>
									{allCoins &&
										`$${(
											allCoins[i].market_data.high_24h.usd * coin.shares
										).toFixed(2)}`}
								</Col>
							</Row>
						);
					})}
			</Container>
		</>
	);
};

export default Portfolio;
