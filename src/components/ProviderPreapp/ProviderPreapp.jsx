import React from 'react';
import {TodoServiceProvider} from "../TodoService/TodoService";
import App from '../App/App.jsx';

export default () => {
	return (
		<TodoServiceProvider children={<App/>}/>
	)
}
