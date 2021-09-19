import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Form, Button, Card, Container, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import app from '../firebase';
import { Link } from 'react-router-dom';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
import { Modal, ModalBody } from 'react-bootstrap';

const SignInModal = ({ currentUser, setCurrentUser, signUp, setSignUp }) => {
	const [show, setShow] = useState(true);
	const [loading, setLoading] = useState(false);
	const [validUser, setValidUser] = useState(null);
	const [error, setError] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const history = useHistory();

	const passwordConfirmRef = useRef();
	const auth = getAuth();

	useEffect(() => {
		console.log(!currentUser);
	}, [currentUser]);

	const handleSubmitSignUp = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			if (passwordRef.current.value === passwordConfirmRef.current.value) {
				const userCrediential = await createUserWithEmailAndPassword(
					auth,
					emailRef.current.value,
					passwordRef.current.value
				);
				const user = userCrediential.user;
				setValidUser(user);
				setLoading(false);
			} else {
				throw new Error('your passwords do not match');
			}
		} catch (error) {
			setLoading(false);
			const errorCode = error.code;
			const errorMessage = error.message;
			setError(errorMessage);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				emailRef.current.value,
				passwordRef.current.value
			);

			setValidUser(user);
			setLoading(false);
			setShow(false);
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	return (
		<>
			{!signUp ? (
				<Modal show={!currentUser}>
					<Card>
						<Card.Body>
							<h2 className='text-center mb-4'>Sign In</h2>
							<Form onSubmit={handleSubmit}>
								<Form.Group id='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control type='email' ref={emailRef} required />
								</Form.Group>
								<Form.Group id='password'>
									<Form.Label>Password</Form.Label>
									<Form.Control type='password' ref={passwordRef} required />
								</Form.Group>
								{loading ? (
									<Spinner animation='border' />
								) : (
									<Button className='w-100 mt-2' type='submit'>
										Sign In
									</Button>
								)}
								{error && (
									<p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
								)}
							</Form>
						</Card.Body>
					</Card>
					<div className='w-100 text-center mt-2'>
						Need an account?{' '}
						<span style={{ color: 'blue' }} onClick={() => setSignUp(true)}>
							Sign up
						</span>
					</div>
				</Modal>
			) : (
				<Modal show={!currentUser}>
					<Card>
						<Card.Body>
							<h2 className='text-center mb-4'>Sign Up</h2>
							<Form onSubmit={handleSubmitSignUp}>
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
										type='password'
										ref={passwordConfirmRef}
										required
									/>
								</Form.Group>
								{loading ? (
									<Spinner animation='border' />
								) : (
									<Button className='w-100 mt-2' type='submit'>
										Sign Up
									</Button>
								)}
							</Form>
						</Card.Body>
						{error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
					</Card>
					<div className='w-100 text-center mt-2'>
						{' '}
						Already have an account?{' '}
						<span style={{ color: 'blue' }} onClick={() => setSignUp(false)}>
							Sign in
						</span>
					</div>
				</Modal>
			)}
		</>
	);
};

export default SignInModal;
