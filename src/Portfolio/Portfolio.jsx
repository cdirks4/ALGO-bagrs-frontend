import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as portApi from '../apiCalls/portfolioCalls';
import { Container, Row, Col } from 'react-bootstrap';
import PortfolioChart from '../Chart/PortfolioChart';
const Portfolio = ({ currentUser, allCoins }) => {
	const [target, setTarget] = useState(null);
	const [portfolio, setPortfolio] = useState(null);
	const [currentCoin, setCurrentCoin] = useState();
	useEffect(() => {
		currentUser &&
			portApi.showPortfolio(currentUser.uid).then((res) => setPortfolio(res));
		portfolio &&
			findCurrentCoin(portfolio, allCoins).then((res) => setCurrentCoin(res));
	}, [currentUser, allCoins]);
	let arr = [];

	const findCurrentCoin = async (data, allCoins) => {
		arr = await data.coins.map((coin) => {
			return allCoins.filter((allcoin) => {
				if (allcoin.id == coin.geckoId?.toLowerCase()) {
					return coin;
				}
			});
		});

		return arr;
	};
	console.log(portfolio);
	return (
		<>
			<PortfolioChart
				portfolio={portfolio}
				target={target}
				setTarget={setTarget}
			/>
			<Container className='border border-secondary mt-4 rounded'>
				<Row className='border-bottom d-flex align-items-center'>
					<Col>Chart View</Col>
					<Col>View Coin</Col>

					<Col>Average Cost</Col>
					<Col>Shares</Col>
					<Col></Col>
				</Row>
				{!portfolio ? (
					<h1> You have not yet made a purchase</h1>
				) : (
					portfolio.coins?.map((coin, i) => {
						return (
							<Row className='border-bottom d-flex align-items-center'>
								<Col onClick={() => setTarget(coin.title)}>
									<img src={coin.symbol} alt={''} className='logo' />
								</Col>
								<Col>
									<Link to={`/details/${coin.geckoId}`}>
										{coin.image.toUpperCase()}
									</Link>
								</Col>
								<Col
									style={{
										color: 'black',
									}}>
									{coin.ppc}
								</Col>

								{/*   */}
								<Col>{coin.shares && coin.shares.toFixed(3)} </Col>

								<Col></Col>
							</Row>
						);
					})
				)}
			</Container>
		</>
	);
};

export default Portfolio;
