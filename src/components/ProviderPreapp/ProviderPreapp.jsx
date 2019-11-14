import React from 'react';
import {AuthProvider} from "../Auth/Auth";
import App from '../App/App.jsx';

export default () => {
	return (
		<AuthProvider children={<App/>}/>
	)
}
