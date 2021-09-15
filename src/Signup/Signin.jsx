import React from 'react';
import { useRef, useState } from 'react';
import { Form, Button, Card, Container, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import app from '../firebase';
import { Link } from 'react-router-dom';
import {
	getAuth,
	signInWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
import { load } from 'protobufjs/minimal';

const Signin = () => {
	const [loading, setLoading] = useState(false);
	const [validUser, setValidUser] = useState(null);
	const [error, setError] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const history = useHistory();

	const auth = getAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				emailRef.current.value,
				passwordRef.current.value
			);
			console.log(user);
			setValidUser(user);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error.message);
			const errorCode = error.code;
			const errorMessage = error.message;
		}
	};

	if (validUser !== null) {
		// The user object has basic properties such as display name, email, etc.
		const displayName = validUser.displayName;
		const email = validUser.email;
		const photoURL = validUser.photoURL;
		const emailVerified = validUser.emailVerified;

		// The user's ID, unique to the Firebase project. Do NOT use
		// this value to authenticate with your backend server, if
		// you have one. Use User.getToken() instead.
		const uid = validUser.uid;
	}
	if (validUser && !loading) {
		history.push('/coinchart');
	}
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
					Need an account? <Link to='/'>Sign up</Link>
				</div>
			</div>
		</Container>
	);
};

export default Signin;
