import React, {useEffect, useState} from 'react';
import AppAuthorized from '../AppAuthorized/AppAuthorized.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import expressUrl from "../../config/expressUrl";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

export default () => {
	const [token, setTokenHook] = useState(localStorage.getItem('token'));
	const [authorizedStatus, setAuthorized] = useState(false);

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
					<Redirect to={'/login'}/>
				</Route>

				<Route path={'/login'} render={() => <Login setToken={setToken} setAuthorized={setAuthorized}
															isAuthorized={((authorizedStatus === 200) && !!token)}/>}/>

				<Route path={'/home'}>
					<AppAuthorized token={token} setAuthorized={setAuthorized}
								   isAuthorized={((authorizedStatus === 200) && !!token)}/>
				</Route>
				<Route>
					<h1 className={'text-center'}>
						404
					</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}
