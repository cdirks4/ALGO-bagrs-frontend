import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import * as api from '../apiCalls/coingecko';

const PortfolioChart = ({ portfolio, target, setTarget }) => {
	const [chartData, setChartData] = useState();
	const [days, setDays] = useState(30);
	let usersMarketValue = null;
	let marketValueObj = {};
	let labels = [];
	let arr = [];
	let titleArray = [];

	const findTotalPortfolio = (data) => {
		const obj = {};
		for (const key in data) {
			titleArray.push([key][0]);
			for (let i = 0; i < data[key].length; i++) {
				if (!obj[i]) {
					obj[i] = { y: data[key][i].y, x: data[key][i].y };
				} else {
					obj[i].y += data[key][i].y;
				}
			}
		}
		for (const key in obj) {
			arr.push(obj[key]);
		}
	};

	const getChartData = async (data) => {
		for (let i = 0; i < data.length; i++) {
			const res = await api.getCoinChartById(data[i].geckoId, days, 30);
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
		if (
			!target &&
			portfolio &&
			portfolio.coins &&
			portfolio.coins.length !== 0
		) {
			setTarget(portfolio?.coins[0].title);
		}
		if (portfolio?.coins) {
			console.log(portfolio);
			getChartData(portfolio?.coins).then((res) => setChartData(res));
		}
	}, [portfolio, target]);
	console.log(chartData);
	return (
		target && (
			<>
				<Line
					data={{
						labels:
							chartData &&
							target &&
							[...Array(chartData[target].length).keys()].reverse(),
						datasets: [
							{
								label: `Total assets 30 days hourly`,
								data: arr,
								borderColor: 'green',
								backgroundColor: 'rgba(100, 198, 290, 0.273)',
								fill: true,
								pointRadius: 0,
							},
							{
								label: `${target && target} 30 days hourly`,
								data: chartData && target && chartData[target],
								borderColor: 'blue',
								backgroundColor: 'rgba(300, 18, 290, 0.273)',
								fill: true,
								pointRadius: 0,
							},
						],
						options: {
							parsing: {
								xAxisKey: 'x',
								yAxisKey: 'y',
							},
							ticks: {
								stepSize: 50,
							},
						},
					}}
				/>
			</>
		)
	);
};

export default PortfolioChart;
