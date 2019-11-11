import React, {useEffect} from 'react';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faList} from '@fortawesome/free-solid-svg-icons';
import {Route, Redirect, useHistory, useRouteMatch} from "react-router-dom";
import Debug from '../Debug'

import './AppAuthorized.css';

import Todo from '../Todo/Todo.jsx';
import Calendar from '../Calendar/Calendar.jsx';

const AppAuthorized = (props) => {
	console.log('AppAuthorized');
	let history = useHistory();
	let match = useRouteMatch();

	return (
		<div>
			<div className="mainBtns">
				<Button onClick={() => history.push(`${match.path}/list`)}><FontAwesomeIcon icon={faList}/></Button>
				<Button onClick={() => history.push(`${match.path}/calendar`)}><FontAwesomeIcon
					icon={faCalendarAlt}/></Button>
			</div>
				<Route exact path={match.path}>
					<Debug msg={'route appauthorized exact path/'}/>
					<Redirect to={`${match.path}/list`}/>
				</Route>
				<Route exact path={`${match.path}/list`}>
					<Debug msg={'route appauthorized list/'}/>
					<Todo {...props} />
				</Route>
				<Route path={`${match.path}/list/:sort`}>
					<Debug msg={'route appauthorized list/:sort'}/>
					<Todo {...props} />
				</Route>
				<Route path={`${match.path}/calendar`}>
					<Calendar {...props}/>
				</Route>
		</div>
	)
}

export default AppAuthorized;
