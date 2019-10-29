import React, { useState } from 'react';
import App from './App_authorized';
import Header from './Header.js';
import Login from './Login';

import "react-datepicker/dist/react-datepicker.css";
import './css/bootstrap.css';

export default () => {
	const [token, setTokenHook] = useState(localStorage.getItem('token'));
	const [authorizedStatus, setAuthorized] = useState(200);

	const setToken = (tkn) => {
		localStorage.setItem('token', tkn);
		setTokenHook(tkn);
	}

	return (
		<div>
			<Header />
			{(authorizedStatus === 200 && token) ?
				<App token={token} setAuthorized={setAuthorized} /> :
				<Login setToken={setToken} setAuthorized={setAuthorized} />}
		</div>
	)
}