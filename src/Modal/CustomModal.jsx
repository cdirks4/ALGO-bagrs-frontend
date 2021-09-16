import React, { useEffect, useRef, useState } from 'react';
import {
	Card,
	Container,
	Row,
	Col,
	Button,
	Modal,
	ModalBody,
	Form,
	FormGroup,
} from 'react-bootstrap';
import * as portApi from '../apiCalls/portfolioCalls';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Chart from '../Chart/Chart';
const CustomModal = ({ setModal, modal, id, targetCoin }) => {
	const [api, setApi] = useState(false);
	const purchaseRef = useRef();
	const [userId, setUserId] = useState();
	const [days, setDays] = useState(1);
	const [purchaseAmount, setPurchaseAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const closeModal = () => {
		setModal(!modal);
	};

	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			const uid = user.uid;
			// ...
			setUserId(uid);
		} else {
			// User is signed out
			// ...
		}
	});
	useEffect(() => {
		setApi(false);
		return setApi(false);
	}, []);

	const handleChange = (e) => {
		setPurchaseAmount(
			e.target.value / targetCoin.market_data.current_price.usd
		);
	};
	const handleSubmit = () => {
		setApi(false);
		portApi.postPortfolio(
			{
				owner: userId,
				title: targetCoin.name,
				amount: purchaseRef.current.value,
				shares: purchaseAmount,
			},

			userId
		);
		setLoading(true);
	};
	api && handleSubmit();
	return (
		<Modal
			show={targetCoin && modal}
			style={{
				width: '700px',
				height: '700px',
			}}>
			<ModalBody>
				<Button onClick={closeModal}>x</Button>
				<Chart id={id} days={days} />
				<Button onClick={() => setDays(1)}>1d</Button>
				<Button onClick={() => setDays(7)}>7d</Button>
				<Button onClick={() => setDays(30)}>30d</Button>
				<Button onClick={() => setDays(365)}>1y</Button>

				<Form>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
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

					<Form.Group className='mb-3' controlId='formBasicCheckbox'>
						<Form.Check type='checkbox' label='Confirm' />
					</Form.Group>
					<Button variant='primary' onClick={() => setApi(true)}>
						Checkout
					</Button>
				</Form>
			</ModalBody>
		</Modal>
	);
};

export default CustomModal;
