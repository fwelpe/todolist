import React from 'react';
import App from './App_authorized';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from './Header.js';

import "react-datepicker/dist/react-datepicker.css";
import './css/bootstrap.css';

export default () => {


	return (
		<div>
			<Header />
			<div id="login">
				<Form>
					<FormGroup>
						<Label for="exampleEmail">Login</Label>
						<Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
					</FormGroup>
					<Button>Submit</Button>
				</Form>
			</div>
		</div>
	)
}