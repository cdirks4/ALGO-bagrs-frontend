import React, { useEffect, useState, useHistory, useRef } from 'react';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts';
import * as api from '../apiCalls/coingecko';
const Chart = ({ id }) => {
	const chartRef = useRef();
	const [days, setDays] = useState(1);
	const [chartData, setChartData] = useState();
	useEffect(() => {
		// console.log(api.getCoinChartById(id, days));
	}, [days]);

	return (
		<>
			{' '}
			<ResponsiveContainer></ResponsiveContainer>
		</>
	);
};

export default Chart;
