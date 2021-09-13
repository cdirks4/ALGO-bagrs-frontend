import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign-up</h2>
					<Form>
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
				Already have an account? Log in
			</div>
		</>
	);
};

export default Signup;
