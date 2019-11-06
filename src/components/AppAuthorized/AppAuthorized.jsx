import React, {useEffect, useState} from 'react';
import {Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faList} from '@fortawesome/free-solid-svg-icons';
import {useHistory} from "react-router-dom";

import './AppAuthorized.css';

import Todo from '../Todo/Todo.jsx';
import Calendar from '../Calendar/Calendar.jsx';

const AppAuthorized = (props) => {
	let history = useHistory();
	useEffect(() => {
		if (!props.isAuthorized)
			history.push('/login');
	})
	const [mainView, setMainView] = useState(<Todo {...props} />);

	const setTodo = () => setMainView(<Todo {...props} />);

	const setCalendar = () => setMainView(
		<Calendar setMainView={setMainView} {...props}/>
	);

	return (
		<div>
			<div className="mainBtns">
				<Button onClick={setTodo}><FontAwesomeIcon icon={faList}/></Button>
				<Button onClick={setCalendar}><FontAwesomeIcon icon={faCalendarAlt}/></Button>
			</div>
			{mainView}
		</div>
	)
}

export default AppAuthorized;
