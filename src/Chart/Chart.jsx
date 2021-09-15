import React, { useEffect, useState, useHistory, useRef } from 'react';

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import * as api from '../apiCalls/coingecko';
const Chart = ({ id }) => {
	const chartRef = useRef();
	const [days, setDays] = useState(1);
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
	let data = null;
	useEffect(() => {
		api
			.getCoinChartById(id, days)
			.then((res) => setChartData(formatData(res.prices)));

		setLoading(false);
	}, [days, id]);
	let arr = [];
	for (let i = 0; i < chartData.length; i++) {
		arr.push(`${i}hr`);
	}
	arr.reverse();
	console.log(arr);
	return (
		<>
			<Line
				data={{
					labels: arr,
					datasets: [
						{
							data: chartData,
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
	);
};

export default Chart;
