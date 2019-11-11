import React, {useEffect, useState} from 'react';
import AppAuthorized from '../AppAuthorized/AppAuthorized.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import expressUrl from "../../config/expressUrl";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

export default () => {
	const [token, setTokenHook] = useState(localStorage.getItem('token'));
	const [authorizedStatus, setAuthorized] = useState();
	console.log('App; authorizedStatus = ', authorizedStatus);

	useEffect(() => {
		if (token) {
			fetch(expressUrl, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
				.then((r) => {
					console.log('App setting status', r.status);
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
	};

	const isAuthorized = (authorizedStatus === 200) && !!token;

	return (
		<BrowserRouter>
			<Header/>
			<Switch>
				<Route exact path={'/'}>
					<Login setToken={setToken} setAuthorized={setAuthorized} isAuthorized={isAuthorized}/>
				</Route>

				<Route path={'/home'}>
					{!isAuthorized ? <Redirect to={'/'}/> : null}
					<AppAuthorized token={token} setAuthorized={setAuthorized} isAuthorized={isAuthorized}/>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}
