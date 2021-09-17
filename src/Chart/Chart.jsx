import React, { useEffect, useState, useHistory, useRef } from 'react';

import { Line } from 'react-chartjs-2';
import * as api from '../apiCalls/coingecko';
const Chart = ({ id, days }) => {
	const chartRef = useRef();

	const [chartData, setChartData] = useState();
	const [loading, setLoading] = useState(false);
	const formatData = (data) => {
		return data.map((data, i) => {
			return {
				x: data[0],
				y: data[1],
			};
		});
	};

	let arr = [];
	const createAxis = (data, days) => {
		for (let i = 0; i < data.length; i++) {
			if (days >= 31) {
				arr.push(`${i}d`);
			} else if (days == 1) {
				arr.push(`${i * 5}m`);
			} else {
				arr.push(`${i}hr`);
			}
		}
		arr.reverse();
	};
	useEffect(() => {
		let interval = 'minutely';
		if (days > 1) {
			interval = 'hourly';
		} else if (days >= 30) {
			interval = 'daily';
		}
		api
			.getCoinChartById(id, days, interval)
			.then((res) => setChartData(formatData(res.prices)));
		setLoading(false);
	}, [days, id]);
	chartData && createAxis(chartData, days);
	return (
		!loading && (
			<>
				<Line
					data={{
						labels: arr,
						datasets: [
							{
								label: 'Market Value USD',
								data: chartData,
								borderColor: 'rgb(75, 192, 192)',
								backgroundColor: 'rgb(75, 192, 192,0.3)',
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
				/>{' '}
			</>
		)
	);
};

export default Chart;
