import { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Container, Navbar } from 'react-bootstrap';
import './CoinDetails.css';
import { useParams } from 'react-router';
import * as api from '../apiCalls/coingecko';
import Chart from '../Chart/Chart';
const CoinDetails = () => {
	const { id } = useParams();
	const [coinDetails, setCoinDetails] = useState();
	const [days, setDays] = useState(30);
	const [interval, setInterval] = useState('hourly');
	useEffect(() => {
		api.getCoinById(id).then((res) => setCoinDetails(res));
	}, []);
	console.log(coinDetails);
	return (
		<>
			<Navbar>
				<Col></Col>
				<a target='blank_' href={`${coinDetails?.links.homepage[0]}`}>
					<Navbar.Brand className='title' style={{}}>
						{coinDetails?.name}
					</Navbar.Brand>
				</a>
				<Col></Col>
			</Navbar>
			<Chart id={id} days={days} interval={interval} />
			<Card body>
				<Button
					variant='secondary'
					className='m-1 '
					size='sm'
					onClick={() => setDays(1)}>
					1d
				</Button>
				<Button
					variant='secondary'
					className='m-1'
					size='sm'
					onClick={() => setDays(7)}>
					7d
				</Button>
				<Button
					variant='secondary'
					className='m-1'
					size='sm'
					onClick={() => setDays(30)}>
					30d
				</Button>
				<Button
					variant='secondary'
					className='m-1'
					size='sm'
					onClick={() => setDays(365)}>
					1y
				</Button>
			</Card>
			<Container className='border border-secondary mt-4 rounded'>
				<Row className='border-bottom d-flex align-items-center'>
					<Col>Market Cap</Col>
					<Col>Current Price</Col>
					<Col>24hr High</Col>
					<Col>24hr Low</Col>
					<Col>24hr%</Col>
					<Col>1hr%</Col>
				</Row>
				<Row className='border-bottom d-flex align-items-center'>
					<Col style={{ color: 'green' }}>
						{coinDetails?.market_data.market_cap.usd}
					</Col>
					<Col>{coinDetails?.market_data.current_price.usd}</Col>
					<Col style={{ color: 'green' }}>
						{coinDetails?.market_data.high_24h.usd}{' '}
					</Col>
					<Col style={{ color: 'red' }}>
						{coinDetails?.market_data.low_24h.usd.toFixed(3)}
					</Col>
					<Col
						style={{
							color:
								coinDetails?.market_data.market_cap_change_percentage_24h > 0
									? 'green'
									: 'red',
						}}>
						{coinDetails?.market_data.market_cap_change_percentage_24h.toFixed(
							3
						)}
					</Col>
					<Col
						style={{
							color:
								coinDetails?.market_data.price_change_percentage_1h_in_currency
									.usd > 0
									? 'green'
									: 'red',
						}}>
						{coinDetails?.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
							3
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CoinDetails;
