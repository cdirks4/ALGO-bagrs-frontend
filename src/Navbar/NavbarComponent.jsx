import React from 'react';
import {
	Navbar,
	Container,
	Row,
	Nav,
	Form,
	FormControl,
	Button,
	Col,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import './Navbar.css';
const NavbarComponent = ({ input, setInput }) => {
	const handleChange = (e) => {
		setInput(e.target.value);
	};
	return (
		<>
			<>
				<Navbar bg='dark' variant='dark' className='align-items-center'>
					<Row className='w-100 p-3'>
						<Col className='md-4'>
							<Navbar.Brand>
								<Link to='/' style={{ color: 'white' }}>
									Algo Bagrs
								</Link>
							</Navbar.Brand>
						</Col>
						<Col className='md-4'>
							<Nav className='me-auto'>
								<Nav.Link>
									<Link to='/coinchart' style={{ color: 'white' }}>
										Global Chart
									</Link>
								</Nav.Link>
							</Nav>
						</Col>
						<Col className=''>
							<Nav.Link>
								<Link to='/portfolio' style={{ color: 'white' }}>
									Portfolio
								</Link>
							</Nav.Link>
						</Col>
						<Col className='lg-8-'>
							<Form className='d-flex'>
								<FormControl
									type='search'
									placeholder='Search'
									className='search'
									aria-label='Search'
									onChange={handleChange}
								/>
							</Form>
						</Col>
					</Row>
				</Navbar>
			</>
		</>
	);
};

export default NavbarComponent;
