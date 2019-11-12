import React, {useEffect, useState} from 'react';
import AppAuthorized from '../AppAuthorized/AppAuthorized.jsx';
import Header from '../Header/Header.jsx';
import expressGetUrl from "../../config/expressUrl";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import expressLoginUrl from "../../config/expressLoginUrl";

import './App.css';

export default () => {
	const [token, setTokenHook] = useState(localStorage.getItem('token'));
	const [authorizedStatus, setAuthorized] = useState();
	console.log('App; authorizedStatus = ', authorizedStatus);
	const [user, setUser] = useState('');
	const handleChangeUser = (event) => setUser(event.target.value);
	const [psw, setPsw] = useState('');
	const handleChangePsw = (event) => setPsw(event.target.value);
	const [invalidInput, setInvalidInput] = useState(false);
	const [btnClr, setBtnClr] = useState('secondary');
	const [todoObj, setTodoObjHook] = useState({});

	useEffect(() => {
		const inner = async () => {
			if (token) {
				await fetch(expressGetUrl, {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				})
					.then((r) => {
						setAuthorized(r.status);
						if (r.status === 200)
							return r.json();
						else
							setToken('');
					})
					.then((r) => {
						setTodoObjHook(r);
					})
					.catch((err) => {
						console.log('err in main data read fetch', err);
					});
			}
		}
		inner();
	}, [token]);


	// useEffect(() => {
	// 	const inner = async () => {
	// 		if (token) {
	// 			await fetch(expressUrl, {
	// 				headers: {
	// 					"Authorization": `Bearer ${token}`
	// 				}
	// 			})
	// 				.then((r) => {
	// 					console.log('App setting status', r.status);
	// 					setAuthorized(r.status);
	// 					if (r.status !== 200) {
	// 						setToken('');
	// 					}
	// 				})
	// 		}
	// 	};
	// 	inner();
	// }, [token]);

	const setToken = (tkn) => {
		localStorage.setItem('token', tkn);
		setTokenHook(tkn);
	};

	const sbmt = (event) => {
		event.preventDefault();
		fetch(expressLoginUrl, {
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({username: user, password: psw})
		})
			.then((r) => {
				console.log('Login setting status', r.status);
				setAuthorized(r.status);
				if (r.status === 200)
					return r.text();
				else {
					setInvalidInput(true);
					setBtnClr('danger');
					setTimeout(() => {
						setInvalidInput(false);
						setBtnClr('secondary');
					}, 2000);
					setToken('');
				}
			})
			.then((r) => {
				if (r) {
					setToken(r);
				}
			})
			.catch((err) => {
				console.error(err)
			})
	};

	const isAuthorized = (authorizedStatus === 200) && !!token;

	return (
		<BrowserRouter>
			<Header/>
			<Route exact path={'/'}>
				{isAuthorized ? <Redirect to={'/home'}/> :
					<div id="login" className="form-signin">
						<Form onSubmit={sbmt}>
							<FormGroup>
								<Label for="login">Login</Label>
								<Input invalid={invalidInput} type="text" id="login" placeholder="Login"
									   value={user} onChange={handleChangeUser} required/>
							</FormGroup>
							<FormGroup>
								<Label for="psw">Password</Label>
								<Input invalid={invalidInput} type="password" id="psw" placeholder="Password"
									   value={psw} onChange={handleChangePsw} required/>
							</FormGroup>
							<Button color={btnClr} className={"btn btn-lg btn-primary btn-block"}>Submit</Button>
						</Form>
					</div>
				}
			</Route>

			<Route path={'/home'}>
				{!isAuthorized ? <Redirect to={'/'}/> :
					<AppAuthorized token={token} todoObj={todoObj} setTodoObjHook={setTodoObjHook}/>
				}
			</Route>
		</BrowserRouter>
	)
}
