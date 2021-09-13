import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
import app from '../firebase';
import { Link } from 'react-router-dom';
const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const auth = getAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCrediential = await createUserWithEmailAndPassword(
				auth,
				emailRef.current.value,
				passwordRef.current.value
			);
			const user = userCrediential.user;
			const emailSent = await sendEmailVerification(auth.user);
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
		}
	};
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign Up</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type='password-confirm'
								ref={passwordConfirmRef}
								required
							/>
						</Form.Group>
						<div style={{ height: '5px' }}></div>
						<Button className='w-100' type='submit'>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				{' '}
				Already have an account? <Link to='/signin'>Sign in</Link>
			</div>
		</>
	);
};

export default Signup;
