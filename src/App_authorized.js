import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faList } from '@fortawesome/free-solid-svg-icons';

import "react-datepicker/dist/react-datepicker.css";
import './css/bootstrap.css';
import Todo from './Todo.js'
import Calendar from './Calendar';

const App = (props) => {
	const [mainView, setMainView] = useState(<Todo {...props} />);

	const setTodo = () => setMainView(<Todo {...props} />);

	const setCalendar = () => setMainView(
		<Calendar setMainView={setMainView} {...props}/>
	);

	return (
		<div>
			<div className="mainBtns">
				<Button onClick={setTodo}><FontAwesomeIcon icon={faList} /></Button>
				<Button onClick={setCalendar}><FontAwesomeIcon icon={faCalendarAlt} /></Button>
			</div>
			{mainView}
		</div>
	)
}

export default App;
