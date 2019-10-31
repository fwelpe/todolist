import React, {useEffect, useState} from 'react';
import AppAuthorized from './App_authorized';
import Header from './Header.js';
import Login from './Login';

import "react-datepicker/dist/react-datepicker.css";
import './css/bootstrap.css';

export default () => {
	const [token, setTokenHook] = useState(localStorage.getItem('token'));
	const [authorizedStatus, setAuthorized] = useState();

	useEffect(() => {
	if (token) {
			fetch('http://localhost:3001', {
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
		<div>
			<Header />
			{(authorizedStatus === 200 && token) ?
				<AppAuthorized token={token} setAuthorized={setAuthorized} /> :
				<Login setToken={setToken} setAuthorized={setAuthorized} />}
		</div>
	)
}