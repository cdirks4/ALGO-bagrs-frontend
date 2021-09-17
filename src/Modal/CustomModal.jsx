import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, ModalBody, Form } from 'react-bootstrap';
import * as portApi from '../apiCalls/portfolioCalls';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Chart from '../Chart/Chart';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

const CustomModal = ({
	setModal,
	modal,
	id,
	targetCoin,
	buySell,
	currentUser,
}) => {
	const [portfolio, setPortfolio] = useState();
	const [sell, setSell] = useState(false);
	const [buy, setBuy] = useState(false);
	const purchaseRef = useRef();
	const [days, setDays] = useState(1);
	const [purchaseAmount, setPurchaseAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [shares, setShares] = useState();
	const closeModal = () => {
		setModal(!modal);
	};

	useEffect(() => {
		currentUser &&
			portApi
				.showPortfolio(currentUser.uid)
				.then((res) => setPortfolio(res.coins));
	}, [currentUser]);

	const handleChange = (e) => {
		setPurchaseAmount(
			e.target.value / targetCoin.market_data.current_price.usd
		);
	};
	const handleSubmit = () => {
		setBuy(false);
		setLoading(true);
		portApi.postPortfolio(
			{
				owner: currentUser.uid,
				title: targetCoin.name,
				ppc: targetCoin.market_data.current_price.usd,
				shares: purchaseAmount,
				geckoId: targetCoin.id,
			},

			currentUser.uid
		);
		setModal(!modal);
	};
	console.log(purchaseAmount);
	const getShares = async (portfolio) => {
		let holder = await portfolio?.filter(
			(coin) => coin.geckoId === targetCoin?.id
		)[0];
		return holder;
	};

	const handleSell = () => {
		setSell(false);
		setLoading(true);
		portApi.sellCoin(
			{
				shares: purchaseAmount,
				coin_id: shares._id,
			},

			currentUser.uid
		);
		setModal(!modal);
	};

	targetCoin && getShares(portfolio).then((res) => setShares(res));
	buy && handleSubmit();
	sell && handleSell();
	return (
		<Modal show={targetCoin && modal}>
			<ModalHeader style={{ textAlign: 'center' }}>
				{targetCoin && targetCoin.name}
			</ModalHeader>
			<ModalBody>
				<Button onClick={closeModal} variant='danger'>
					x
				</Button>
				<Chart id={id} days={days} />
				<Button
					onClick={() => setDays(1)}
					className='m-1'
					size='sm'
					variant='secondary'>
					1d
				</Button>
				<Button
					onClick={() => setDays(7)}
					className='m-1'
					size='sm'
					variant='secondary'>
					7d
				</Button>
				<Button
					onClick={() => setDays(30)}
					className='m-1'
					size='sm'
					variant='secondary'>
					30d
				</Button>
				<Button
					onClick={() => setDays(365)}
					className='m-1'
					size='sm'
					variant='secondary'>
					1y
				</Button>

				<Form>
					{buySell === 'sell' ? (
						<Form.Group className='mb-3'>
							<Form.Label>
								{' '}
								You own {shares ? shares.shares : 0} shares of
								{` ${targetCoin?.name}`}{' '}
							</Form.Label>
							<Form.Control
								onChange={handleChange}
								ref={purchaseRef}
								placeholder='Enter sell amount in USD'
							/>
							<Form.Text className='text-muted'>
								You are selling {purchaseAmount.toFixed(3)}{' '}
								{`${targetCoin && targetCoin.name} `}
								at {targetCoin && targetCoin.market_data.current_price.usd}$ per
								coin
							</Form.Text>
						</Form.Group>
					) : (
						<Form.Group className='mb-3'>
							<Form.Label>Purchase Amount </Form.Label>
							<Form.Control
								onChange={handleChange}
								ref={purchaseRef}
								placeholder='Enter amount in USD'
							/>
							<Form.Text className='text-muted'>
								You are purchasing {purchaseAmount.toFixed(3)}{' '}
								{`${targetCoin && targetCoin.name} `}
								at {targetCoin && targetCoin.market_data.current_price.usd}$ per
								coin
							</Form.Text>
						</Form.Group>
					)}
					{/* modal does not allow event to be prevented for a submit button */}
					{buySell === 'sell' ? (
						<Button variant='danger' onClick={() => setSell(true)}>
							Sell
						</Button>
					) : (
						<Button variant='success' onClick={() => setBuy(true)}>
							Checkout
						</Button>
					)}
				</Form>
			</ModalBody>
		</Modal>
	);
};

export default CustomModal;
