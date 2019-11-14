import React, {useEffect, useState} from 'react';
import AppAuthorized from '../AppAuthorized/AppAuthorized.jsx';
import Header from '../Header/Header.jsx';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import expressLoginUrl from "../../config/expressLoginUrl";
import {CircularProgress} from "@material-ui/core";
import {useAuth} from '../Auth/Auth.jsx';

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
	const [isInitialized, setIsInitialized] = useState(false);
	const auth = useAuth();

	useEffect(() => {
		if (token) {
			auth.getTodoObj(token)
				.then((r) => {
					setAuthorized(r.status);
					if (r.status === 200)
						return r.json();
					else {
						setToken('');
						return {};
					}
				})
				.then((r) => {
					setTodoObjHook(r);
					setIsInitialized(true);
				})
				.catch((err) => {
					console.log('err in main data read fetch', err);
					setIsInitialized(true);
				});
		} else {
			setIsInitialized(true);
		}
	}, [token, auth]);

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
				setAuthorized(err);
				console.error(err);
			})
	};

	const isAuthorized = (authorizedStatus === 200) && !!token;

	return isInitialized ? (
		<BrowserRouter>
			<Header isAuthorized={isAuthorized}/>
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
							<Button color={btnClr}
									className={"btn btn-lg btn-primary btn-block"}>Login</Button>
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
	) : <div id="loader"><CircularProgress/></div>
}
