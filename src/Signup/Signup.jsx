import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
import app from '../firebase';
import { Link } from 'react-router-dom';
const Signup = () => {
	const [error, setError] = useState();
	const [validUser, setValidUser] = useState();
	const [loading, setLoading] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const history = useHistory();
	const auth = getAuth();

	const handleSubmit = async (e) => {
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
				const emailSent = await sendEmailVerification(auth.user);
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
	if (validUser && !loading) {
		history.push('/coinchart');
	}
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
				Already have an account? <Link to='/signin'>Sign in</Link>
			</div>
		</>
	);
};

export default Signup;
