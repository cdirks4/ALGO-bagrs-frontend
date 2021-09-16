import { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { getAuth } from 'firebase/auth';
import * as portApi from '../apiCalls/portfolioCalls';
import * as api from '../apiCalls/coingecko';

const PortfolioChart = ({ portfolio, target }) => {
	const [chartData, setChartData] = useState();
	const [interval, setInterval] = useState('hourly');
	const [days, setDays] = useState(1);
	let usersMarketValue = null;
	let marketValueObj = {};
	let labels = [];

	const findTotalPortfolio = async (data) => {
		console.log(data);
	};

	const getChartData = async (data) => {
		for (let i = 0; i < data.length; i++) {
			const res = await api.getCoinChartById(data[i].geckoId, days, interval);
			usersMarketValue = await res.prices.map((price, j) => {
				labels.push(`${i}hr`);
				return { y: data[i].shares * price[1], x: price[0] };
			});
			marketValueObj[data[i].title] = usersMarketValue;
		}

		return marketValueObj;
	};
	chartData && findTotalPortfolio(chartData);
	useEffect(() => {
		portfolio && getChartData(portfolio.coins).then((res) => setChartData(res));
	}, [portfolio]);

	return (
		<>
			<Line
				data={{
					labels:
						chartData && [...Array(chartData[target].length).keys()].reverse(),
					datasets: [
						{
							label: `${target} USD ${interval}`,
							data: chartData && chartData[target],
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
		</>
	);
};

export default PortfolioChart;
