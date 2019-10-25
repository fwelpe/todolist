import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faList } from '@fortawesome/free-solid-svg-icons';

import "react-datepicker/dist/react-datepicker.css";
import './css/bootstrap.css';
import Header from './Header.js';
import Todo from './Todo.js'
import Calendar from './Calendar';

const App = () => {
	const [todoObj, setTodoObj] = useState({});

	useEffect(() => {
		fetch('http://localhost:3001').then((r) => r.json()).then((r) => {
			setTodoObj(r);
	})
	}, [])

	const [mainView, setMainView] = useState(<Todo todoObj={todoObj} setTodoObj={setTodoObj} />);

	const setTodo = () => setMainView(<Todo todoObj={todoObj} setTodoObj={setTodoObj} />);

	const setCalendar = () => setMainView(
		<Calendar setMainView={setMainView} todoObj={todoObj} setTodoObj={setTodoObj} />
	);

	return (
		<div>
			<Header />
			<div className="mainBtns">
				<Button onClick={setTodo}><FontAwesomeIcon icon={faList} /></Button>
				<Button onClick={setCalendar}><FontAwesomeIcon icon={faCalendarAlt} /></Button>
			</div>
			{mainView}
		</div>
	)
}

export default App;
