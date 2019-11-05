import React, {useEffect, useState} from 'react';
import AppAuthorized from '../AppAuthorized/AppAuthorized.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import expressUrl from "../../config/expressUrl";
import {BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";

export default () => {
	const [token, setTokenHook] = useState(localStorage.getItem('token'));
	const [authorizedStatus, setAuthorized] = useState();

	useEffect(() => {
		if (token) {
			fetch(expressUrl, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
				.then((r) => {
					setAuthorized(r.status);
					if (r.status !== 200) {
						setToken('');
					}
				})
		}
	}, [token]);

	const setToken = (tkn) => {
		localStorage.setItem('token', tkn);
		setTokenHook(tkn);
	}

	return (
		<BrowserRouter>
			<Header/>
			<Switch>
				<Route exact path={'/'}>
					{(authorizedStatus !== 200 || !token) ? <Redirect to={'/login'}/> : <Redirect to={'/home'}/>}
				</Route>

				<Route path={'/login'}>
					<Login setToken={setToken} setAuthorized={setAuthorized}/>
				</Route>

				<Route path={'/home'}>
					<AppAuthorized token={token} setAuthorized={setAuthorized}/>
				</Route>


			</Switch>
		</BrowserRouter>
	)
}