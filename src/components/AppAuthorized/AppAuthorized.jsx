import React, {useEffect} from 'react';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faList} from '@fortawesome/free-solid-svg-icons';
import {Route, Switch, Redirect, useHistory, useRouteMatch} from "react-router-dom";

import './AppAuthorized.css';

import Todo from '../Todo/Todo.jsx';
import Calendar from '../Calendar/Calendar.jsx';

const AppAuthorized = (props) => {
	console.log('AppAuthorized props', props)
	let history = useHistory();
	let match = useRouteMatch();
	useEffect(() => {
		if (!props.isAuthorized)
			history.push('/login');
	});

	return (
		<div>
			<div className="mainBtns">
				<Button onClick={() => history.push(`${match.path}/list`)}><FontAwesomeIcon icon={faList}/></Button>
				<Button onClick={() => history.push(`${match.path}/calendar`)}><FontAwesomeIcon
					icon={faCalendarAlt}/></Button>
			</div>
			<Switch>
				<Route exact path={match.path}>
					<Redirect to={`${match.path}/list`}/>
				</Route>
				<Route exact path={`${match.path}/list`}>
					<Todo {...props} />
				</Route>
				<Route path={`${match.path}/list/:sort`}>
					<Todo {...props} />
				</Route>
				<Route path={`${match.path}/calendar`}>
					<Calendar {...props}/>
				</Route>
			</Switch>
		</div>
	)
}

export default AppAuthorized;
