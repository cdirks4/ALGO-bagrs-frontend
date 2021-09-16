import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../apiCalls/coingecko';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './CoinChart.css';
import { getAuth } from 'firebase/auth';
import CustomModal from '../Modal/CustomModal';

const CoinChart = ({ input }) => {
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState();
	const [coins, setCoins] = useState();
	const [currentUser, setCurrentUser] = useState();
	const [page, setPage] = useState(1);
	const auth = getAuth();
	const [modal, setModal] = useState(false);
	const [targetCoin, setTargetCoin] = useState(null);

	auth.onAuthStateChanged((user) => {
		user ? setCurrentUser(user) : setCurrentUser(null);
	});

	useEffect(() => {
		api.getCoins(page).then((res) => setCoins(res));
	}, [page]);

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

	const toggleModal = async (e) => {
		setId(e.target.id);
		const coin = await api.getCoinById(e.target.id);
		setModal(true);
		setTargetCoin(coin);
	};

	return (
		<>
			<Container
				className='border border-light mt-4 rounded'
				style={{ color: 'black' }}>
				<Row className='border-bottom d-flex align-items-center'>
					<Col>
						<div
							className='link'
							id='market_cap_rank'
							onClick={(e) => handleClick(e)}
							style={{ color: 'black' }}>
							Market Cap
						</div>
					</Col>
					<Col>
						<div id='name' style={{ color: 'black' }}>
							Symbol
						</div>
					</Col>
					<Col>
						<div style={{ color: 'black' }}>Logo</div>
					</Col>
					<Col>
						<div
							className='link'
							style={{ color: 'black' }}
							id='current_price'
							onClick={(e) => handleClick(e)}>
							Price
						</div>
					</Col>
					<Col>
						<div
							className='link'
							id='price_change_percentage_1h_in_currency'
							style={{ color: 'black' }}
							onClick={(e) => handleClick(e)}>
							1hr
						</div>
					</Col>
					<Col>
						<div
							id='price_change_percentage_24h_in_currency'
							className='link'
							style={{ color: 'black' }}
							onClick={(e) => handleClick(e)}>
							24hr
						</div>
					</Col>
					<Col></Col>
				</Row>
				{loading ? (
					<h1></h1>
				) : (
					coins &&
					coins
						.filter((coin) => {
							if (input === '') {
								return coin;
							} else if (coin.symbol.includes(input?.toLowerCase())) {
								return coin;
							} else if (
								coin.name.toLowerCase().includes(input?.toLowerCase())
							) {
								return coin;
							}
						})
						.map((coin) => {
							return (
								<Row className='border-bottom d-flex align-items-center'>
									<Col className=''>#{coin.market_cap_rank}</Col>
									<Col className='w-20 '>
										<img src={coin.image} alt={coin.name} className='logo' />
									</Col>
									<Col className=''>
										<Link to={`/details/${coin.id}`}>
											{coin.symbol.toUpperCase()}
										</Link>
									</Col>
									<Col className=''>{coin.current_price}</Col>
									<Col
										className=''
										style={{
											color:
												coin.price_change_percentage_1h_in_currency > 0
													? 'green'
													: 'red',
										}}>
										{coin.price_change_percentage_1h_in_currency.toFixed(3)}%
									</Col>
									<Col
										className=''
										style={{
											color:
												coin.price_change_percentage_24h_in_currency > 0
													? 'green'
													: 'red',
										}}>
										{coin.price_change_percentage_24h_in_currency.toFixed(3)}%
									</Col>
									<Col>
										<Button
											variant='secondary'
											size='sm'
											onClick={toggleModal}
											id={coin.id}>
											buy
										</Button>
									</Col>
								</Row>
							);
						})
				)}
			</Container>
			<CustomModal
				setModal={setModal}
				modal={modal}
				id={id}
				targetCoin={targetCoin}
			/>
			<nav>
				<ul class='pagination justify-content-center'>
					<li class='page-item'>
						<a class='page-link' href='#' onClick={() => setPage(1)}>
							1
						</a>
					</li>
					<li class='page-item'>
						<a class='page-link' href='#' onClick={() => setPage(2)}>
							2
						</a>
					</li>
					<li class='page-item'>
						<a class='page-link' href='#' onClick={() => setPage(3)}>
							3
						</a>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default CoinChart;
