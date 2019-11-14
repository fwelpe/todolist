import React from 'react';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faList} from '@fortawesome/free-solid-svg-icons';
import {Route, Redirect, useHistory, useRouteMatch} from "react-router-dom";

import './AppAuthorized.css';

import Todo from '../Todo/Todo.jsx';
import Calendar from '../Calendar/Calendar.jsx';

const AppAuthorized = ({token, todoObj, setTodoObjHook}) => {
	let history = useHistory();
	let match = useRouteMatch();

	const showList = () => history.push(`${match.path}/list`);
	const showCalendar = () => history.push(`${match.path}/calendar`);

	return (
		<div>
			<div className="mainBtns">
				<Button onClick={showList}>
					<FontAwesomeIcon icon={faList}/>
				</Button>
				<Button onClick={showCalendar}>
					<FontAwesomeIcon icon={faCalendarAlt}/>
				</Button>
			</div>
			<Route exact path={match.path}>
				<Redirect to={`${match.path}/list`}/>
			</Route>

			<Route exact path={`${match.path}/list`}>
				<Todo token={token} todoObj={todoObj} setTodoObjHook={setTodoObjHook}/>
			</Route>

			<Route path={`${match.path}/list/:sort`}>
				<Todo token={token} todoObj={todoObj} setTodoObjHook={setTodoObjHook}/>
			</Route>

			<Route path={`${match.path}/calendar`}>
				<Calendar token={token} TodoObj={todoObj}/>
			</Route>
		</div>
	)
};

export default AppAuthorized;
