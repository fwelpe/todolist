import React, {useEffect, useState} from 'react';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faList} from '@fortawesome/free-solid-svg-icons';
import {Route, Redirect, useHistory, useRouteMatch} from "react-router-dom";

import './AppAuthorized.css';

import Todo from '../Todo/Todo.jsx';
import Calendar from '../Calendar/Calendar.jsx';
import expressGetUrl from "../../config/expressUrl";

const AppAuthorized = (props) => {
	console.log('AppAuthorized');
	let history = useHistory();
	let match = useRouteMatch();
	let {token, setAuthorized} = props;
	const [todoObj, setTodoObjHook] = useState({});

	useEffect(() => {
		const inner = async () => {
			await fetch(expressGetUrl, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
				.then((r) => {
					setAuthorized(r.status);
					if (r.status === 200)
						return r.json();
				})
				.then((r) => {
					setTodoObjHook(r);
				})
				.catch((err) => {
					setAuthorized(err);
				});
		}
		inner();
	}, [setAuthorized, token]);

	return (
		<div>
			<div className="mainBtns">
				<Button onClick={() => history.push(`${match.path}/list`)}><FontAwesomeIcon icon={faList}/></Button>
				<Button onClick={() => history.push(`${match.path}/calendar`)}><FontAwesomeIcon
					icon={faCalendarAlt}/></Button>
			</div>
			<Route exact path={match.path}>
				<Redirect to={`${match.path}/list`}/>
			</Route>

			<Route exact path={`${match.path}/list`}>
				<Todo {...props} todoObj={todoObj} setTodoObjHook={setTodoObjHook}/>
			</Route>

			<Route path={`${match.path}/list/:sort`}>
				<Todo {...props} todoObj={todoObj} setTodoObjHook={setTodoObjHook}/>
			</Route>

			<Route path={`${match.path}/calendar`}>
				<Calendar {...props} TodoObj={todoObj}/>
			</Route>
		</div>
	)
}

export default AppAuthorized;
