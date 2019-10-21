import React from "react";
import { Button } from 'reactstrap';
import Moment from 'react-moment';


const TodoItem = (props) => {
	const completedStyle = props.item.completed ? {
		fontStyle: "italic",
		color: "#cdcdcd",
		textDecoration: "line-through"
	} : null
	const yearNow = new Date().getFullYear();
	const yearTodo = new Date(props.item.date).getFullYear();
	const timeRegex = yearNow === yearTodo ? 'MMMM D' : "MMMM D, YYYY"
	const expires = <Moment format={timeRegex}>{props.item.date}</Moment>

	return (
		<div className="todo-item">
			<input type="checkbox" checked={props.item.completed} onChange={() => props.changeDone(props.id)} />
			<div>
				<p style={completedStyle}>{props.item.todo} [{props.item.type}]</p>
				<p style={completedStyle}>{props.item.desc}</p>
				<p style={completedStyle}>Deadline: {expires}</p>
			</div>
			<Button onClick={() => props.delTodo(props.id)} className="delBtn" close />
		</div>
	)
}

export default TodoItem