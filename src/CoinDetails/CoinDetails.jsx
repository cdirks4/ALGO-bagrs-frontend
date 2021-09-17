import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
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
	return (
		<>
			<Chart id={id} days={days} interval={interval} />
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
		</>
	);
};

export default CoinDetails;
