import React from "react";
import { Button, ButtonGroup } from 'reactstrap';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faTimesCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const TodoItem = (props) => {
	const completedStyle = props.item.completed ? {
		fontStyle: "italic",
		color: "#cdcdcd",
		textDecoration: "line-through",
	} : null;
	const msInDay = 1000 * 60 * 60 * 24;
	const ifSoonStyle = (Date.parse(new Date(props.item.date)) - Date.parse(new Date())) < msInDay * 2 ?
		{ background: '#dc3545' } : null;
	const yearNow = new Date().getFullYear();
	const yearTodo = new Date(props.item.date).getFullYear();
	const timeRegex = yearNow === yearTodo ? 'MMMM D' : "MMMM D, YYYY";
	const expires = <Moment format={timeRegex}>{props.item.date}</Moment>;
	const importantClass = props.item.important && !props.item.completed ? {
		'marginRight': '16px',
		'marginBottom': '-1px',
		'color': "#dc3545",
	} : {
		'visibility': 'hidden'
	 }
	

	return (
		<div className="todo-item">
			<input type="checkbox" checked={props.item.completed} onChange={() => props.changeDone(props.id)} />
			<div>
				<p style={completedStyle}>{props.item.todo} [{props.item.type}]</p>
				<p style={completedStyle}><small>{props.item.desc}</small></p>
				<p style={completedStyle ? completedStyle : ifSoonStyle}>Deadline: {expires}</p>
			</div>
				<FontAwesomeIcon style={importantClass} icon={faFlag} className="text-danger rightInFlex" />
				<ButtonGroup>
					<Button onClick={() => props.delTodo(props.id)}><FontAwesomeIcon icon={faTimesCircle} /></Button>
					<Button onClick={() => props.changeTodo(props.item, props.id)}><FontAwesomeIcon icon={faPencilAlt} /></Button>
				</ButtonGroup>
			</div>
	)
}

export default TodoItem