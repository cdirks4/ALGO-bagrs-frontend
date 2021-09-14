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
	const [error, setError] = useState();
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
			setError(errorMessage);
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
							<Form.Control type='password' ref={passwordConfirmRef} required />
						</Form.Group>
						<Button className='w-100 mt-3' type='submit'>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
				{error && <h2>{error}</h2>}
			</Card>
			<div className='w-100 text-center mt-2'>
				{' '}
				Already have an account? <Link to='/signin'>Sign in</Link>
			</div>
		</>
	);
};

export default Signup;
