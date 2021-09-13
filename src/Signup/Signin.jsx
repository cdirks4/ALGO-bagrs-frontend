import React from 'react';
import { useRef, useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import app from '../firebase';
import { Link } from 'react-router-dom';
import {
	getAuth,
	signInWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
const Signin = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const auth = getAuth();

	const handleSubmit = async (e) => {
		e.preventDefault(e);
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				emailRef,
				passwordRef
			);
			const emailSent = sendEmailVerification(auth.user);
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
		}
	};

	const user = auth.currentUser;
	if (user !== null) {
		// The user object has basic properties such as display name, email, etc.
		const displayName = user.displayName;
		const email = user.email;
		const photoURL = user.photoURL;
		const emailVerified = user.emailVerified;

		// The user's ID, unique to the Firebase project. Do NOT use
		// this value to authenticate with your backend server, if
		// you have one. Use User.getToken() instead.
		const uid = user.uid;
	}
	console.log(user);
	return (
		<Container>
			<div className='w-100' style={{ maxWidth: '400px', minHeight: '500px' }}>
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
					Need an account? <Link to='/signup'>Sign up</Link>
				</div>
			</div>
		</Container>
	);
};

export default Signin;
