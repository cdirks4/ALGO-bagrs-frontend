import React, { useState, useEffect, useRef } from 'react';
import * as portApi from '../apiCalls/portfolioCalls';
import * as api from '../apiCalls/coingecko';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { Doughnut, Line } from 'react-chartjs-2';
const Portfolio = ({ currentUser, setCurrentUser }) => {
	const [interval, setInterval] = useState('hourly');
	const [days, setDays] = useState(1);
	const [portfolio, setPortfolio] = useState();
	const [chartData, setChartData] = useState(null);
	const [loading, setLoading] = useState(true);
	const auth = getAuth();

	auth.onAuthStateChanged((user) => {
		user ? setCurrentUser(user) : setCurrentUser(null);
		console.log('hi');
	});
	let usersMarketValue = null;
	let marketValueObj = {};
	let labels = [];
	const getChartData = async (data) => {
		for (let i = 0; i < data.length; i++) {
			const res = await api.getCoinChartById(data[i].geckoId, days, interval);
			usersMarketValue = await res.prices.map((price, j) => {
				labels.push(`${i}hr`);
				return { y: data[i].shares * price[1], x: price[0] };
			});
			marketValueObj[data[i].title] = usersMarketValue;
		}
		setLoading(false);
		return marketValueObj;
	};

	useEffect(() => {
		currentUser &&
			portApi.showPortfolio(currentUser.uid).then((res) => setPortfolio(res));
		portfolio && getChartData(portfolio.coins).then((res) => setChartData(res));
	}, []);

	return !currentUser ? (
		<h1>You must sign in to use this page</h1>
	) : loading ? (
		<p>loading</p>
	) : (
		<>
			<Line
				data={{
					labels:
						chartData &&
						[...Array(chartData['Bitcoin'].length).keys()].reverse(),
					datasets: [
						{
							label: `Market Value USD ${interval}`,
							data: chartData && chartData['Bitcoin'],
							borderColor: 'darkblue',
							backgroundColor: 'rgba(100, 148, 230, 0.273)',
							fill: true,
							pointRadius: 0,
						},
					],
					options: {
						parsing: {
							xAxisKey: 'x',
							yAxisKey: 'y',
						},
					},
				}}
			/>

			<Container className='border border-light mt-4 rounded'>
				<Row className='border-bottom d-flex align-items-center'>
					<Col></Col>
				</Row>
				{portfolio &&
					portfolio.coins.map((coin) => {
						return (
							<Row>
								<Col>{coin.title}</Col>
								<Col>
									{(
										chartData &&
										chartData[coin.title][0].y * coin.shares &&
										coin.shares
									).toFixed(3)}
								</Col>
								<Col>{coin.ppc}</Col>
								<Col>{coin.shares.toFixed(3)}</Col>
							</Row>
						);
					})}
			</Container>
		</>
	);
};

export default Portfolio;
