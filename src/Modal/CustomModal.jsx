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
import Chart from '../Chart/Chart';
const CustomModal = ({ setModal, modal, id, targetCoin }) => {
	const purchaseRef = useRef();
	const [days, setDays] = useState(1);
	const [purchaseAmount, setPurchaseAmount] = useState(0);
	const closeModal = () => {
		setModal(!modal);
	};
	useEffect(() => {}, []);

	const handleChange = (e) => {
		setPurchaseAmount(
			e.target.value / targetCoin.market_data.current_price.usd
		);
	};
	const handleSubmit = () => {};
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
							{`${targetCoin.name} `}
							at {targetCoin && targetCoin.market_data.current_price.usd} per
							coin
						</Form.Text>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicCheckbox'>
						<Form.Check type='checkbox' label='Confirm' />
					</Form.Group>
					<Button variant='primary' type='submit'>
						Checkout
					</Button>
				</Form>
			</ModalBody>
		</Modal>
	);
};

export default CustomModal;
