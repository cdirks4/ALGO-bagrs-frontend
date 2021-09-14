import React, { useState, useEffect, useParams } from 'react';
import * as api from '../apiCalls/coingecko';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './CoinChart.css';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
const CoinChart = () => {
	const [loading, setLoading] = useState(false);
	const [coins, setCoins] = useState();
	const [currentUser, setCurrentUser] = useState();
	const [page, setPage] = useState(1);
	const auth = getAuth();
	useEffect(() => {
		auth.onAuthStateChanged((user) => setCurrentUser(user));
		api.getCoins(page).then((res) => setCoins(res));
	}, []);

	const handleClick = async (e) => {
		setLoading(true);
		if (e.target.id === 'market_cap_rank') {
			const coin = await coins.sort((a, b) =>
				a[e.target.id] > b[e.target.id] ? 1 : -1
			);
			setCoins(coin);
		} else {
			const coin = await coins.sort((a, b) =>
				a[e.target.id] > b[e.target.id] ? -1 : 1
			);
			setCoins(coin);
		}
		setLoading(false);
	};

	return (
		<>
			<Container className='border border-primary mt-4 rounded'>
				<Row className='border-bottom d-flex align-items-center'>
					<Col>
						<div
							id='market_cap_rank'
							onClick={(e) => handleClick(e)}
							style={{ color: 'black' }}>
							Rank
						</div>
					</Col>
					<Col>
						<div style={{ color: 'black' }}>logo</div>
					</Col>
					<Col>
						<div id='name' style={{ color: 'black' }}>
							name
						</div>
					</Col>
					<Col>
						<div
							style={{ color: 'black' }}
							id='current_price'
							onClick={(e) => handleClick(e)}>
							price
						</div>
					</Col>
					<Col>
						<div
							id='price_change_percentage_1h_in_currency'
							style={{ color: 'black' }}
							onClick={(e) => handleClick(e)}>
							1hr
						</div>
					</Col>
					<Col>
						<div
							id='price_change_percentage_24h_in_currency'
							style={{ color: 'black' }}
							onClick={(e) => handleClick(e)}>
							24hr
						</div>
					</Col>
				</Row>
				{loading ? (
					<h1></h1>
				) : (
					coins &&
					coins.map((coin) => {
						return (
							<Row className='border-bottom d-flex align-items-center'>
								<Col className=''>{coin.market_cap_rank}</Col>
								<Col className='w-20 '>
									<img src={coin.image} alt={coin.name} className='logo' />
								</Col>
								<Col className=''>{coin.symbol}</Col>
								<Col className=''>{coin.current_price}</Col>
								<Col className=''>
									{coin.price_change_percentage_1h_in_currency.toFixed(3)}%
								</Col>
								<Col className=''>
									{coin.price_change_percentage_24h_in_currency.toFixed(3)}%
								</Col>
							</Row>
						);
					})
				)}
			</Container>
			<></>
		</>
	);
};

export default CoinChart;
