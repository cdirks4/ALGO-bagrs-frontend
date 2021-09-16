import { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import * as api from '../apiCalls/coingecko';
import Chart from '../Chart/Chart';
const CoinDetails = () => {
	const [coinDetails, setCoinDetails] = useState();
	const { id } = useParams();
	const [days, setDays] = useState(30);
	useEffect(() => {
		api.getCoinById(id).then((res) => setCoinDetails(res));
	}, []);
	return (
		<>
			<Chart id={id} days={365} />
		</>
	);
};

export default CoinDetails;
