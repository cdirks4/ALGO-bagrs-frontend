import React, { useEffect, useState, useHistory, useRef } from 'react';

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import * as api from '../apiCalls/coingecko';
const Chart = ({ id }) => {
	const chartRef = useRef();
	const [days, setDays] = useState(1);
	const [chartData, setChartData] = useState();
	const [loading, setLoading] = useState(false);
	const formatData = (data) => {
		return data.map((data) => {
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
	}, [days]);

	return (
		<>
			<Line
				data={{
					labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
					datasets: [
						{
							label: 'market price',
							data: chartData,
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)',
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)',
							],
							borderWidth: 1,
						},
					],
					options: {
						lineHeightAnnotation: {
							always: true,
							hover: false,
							lineWeight: 1.5,
						},
						scales: {
							xAxes: [
								{
									type: 'time',
									distribution: 'linear',
								},
							],
						},
					},
				}}
			/>{' '}
		</>
	);
};

export default Chart;
