import React, {useEffect, useState} from 'react';
import AppAuthorized from '../AppAuthorized/AppAuthorized.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';

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