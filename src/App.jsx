import React from 'react';
import { Container } from 'react-bootstrap';
import Signup from './Signup/Signup';
const App = () => {
	return (
		<>
			<Container
				className='d-flex align-items-center justify-content-center'
				style={{ minHeight: '100vh' }}>
				<div
					className='w-100'
					style={{ maxWidth: '400px', minHeight: '500px' }}>
					<Signup />
				</div>
			</Container>
		</>
	);
};

export default App;
