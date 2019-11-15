import React, {useEffect, useState} from 'react';
import AppAuthorized from '../AppAuthorized/AppAuthorized.jsx';
import Header from '../Header/Header.jsx';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {CircularProgress} from "@material-ui/core";
import {useTodoService} from '../TodoService/TodoService.jsx';

import './App.css';

export default () => {
	const [token, setTokenHook] = useState(localStorage.getItem('token'));
	const [authorizedStatus, setAuthorized] = useState();
	const [username, setUsername] = useState('');
	const handleChangeUsername = (event) => setUsername(event.target.value);
	const [password, setPassword] = useState('');
	const handleChangePassword = (event) => setPassword(event.target.value);
	const [invalidInput, setInvalidInput] = useState(false);
	const [todoObj, setTodoObjHook] = useState({});
	const [isInitialized, setIsInitialized] = useState(false);
	const todoService = useTodoService();

	useEffect(() => {
		if (token) {
			todoService.getTodoObj(token)
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
					setIsInitialized(true);
				});
		} else {
			setIsInitialized(true);
		}
	}, [token, todoService]);

	const setToken = (tkn) => {
		localStorage.setItem('token', tkn);
		setTokenHook(tkn);
	};

	const submit = (event) => {
		event.preventDefault();
		todoService.login(username, password)
			.then((r) => {
				setAuthorized(r.status);
				if (r.status === 200)
					return r.text();
				else {
					setInvalidInput(true);
					setTimeout(() => {
						setInvalidInput(false);
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
			})
	};

	const isAuthorized = (authorizedStatus === 200) && !!token;

	return isInitialized ? (
		<BrowserRouter>
			<Header isAuthorized={isAuthorized}/>
			<Route exact path={'/'}>
				{isAuthorized ? <Redirect to={'/home'}/> :
					<div id="login" className="form-signin">
						<Form onSubmit={submit}>
							<FormGroup>
								<Label for="login">Login</Label>
								<Input invalid={invalidInput} type="text" id="login" placeholder="Login"
									   value={username} onChange={handleChangeUsername} required/>
							</FormGroup>
							<FormGroup>
								<Label for="psw">Password</Label>
								<Input invalid={invalidInput} type="password" id="psw" placeholder="Password"
									   value={password} onChange={handleChangePassword} required/>
							</FormGroup>
							<Button color={invalidInput ? 'danger' : 'secondary'}
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
