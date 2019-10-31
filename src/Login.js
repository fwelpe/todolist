import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './css/signin.css';

export default (props) => {
	const [user, setUser] = useState('');
	const handleChangeUser = (event) => setUser(event.target.value)
	const [psw, setPsw] = useState('');
	const handleChangePsw = (event) => setPsw(event.target.value)
	const [invalidInput, setInvalidInput] = useState(false);
	const [btnClr, setBtnClr] = useState('secondary');

	const sbmt = (event) => {
		event.preventDefault();
		fetch('http://localhost:3001/login', {
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({ username: user, password: psw })
		})
		.then((r) => {
			props.setAuthorized(r.status);
			if (r.status === 200)
				return r.text();
			else {
				setInvalidInput(true);
				setBtnClr('danger');
				setTimeout(() => {
					setInvalidInput(false);
					setBtnClr('secondary');
				}, 2000);
				props.setToken('');
			}
		})
		.then((r) => {
			if (r) {
				// console.log(r);
				props.setToken(r);
			}
		})
		.catch((err) => {console.error(err)})
	}

	return (
		<div id="login" className="form-signin">
			<Form onSubmit={sbmt}>
				<FormGroup>
					<Label for="login">Login</Label>
					<Input invalid={invalidInput} type="text" id="login" placeholder="Login"
					value={user} onChange={handleChangeUser} required />
				</FormGroup>
				<FormGroup>
					<Label for="psw">Password</Label>
					<Input invalid={invalidInput} type="password" id="psw" placeholder="Password"
					value={psw} onChange={handleChangePsw} required />
				</FormGroup>
				<Button color={btnClr} className={"btn btn-lg btn-primary btn-block"}>Submit</Button>
			</Form>
		</div>
	)
}