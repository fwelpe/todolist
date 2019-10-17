import React from "react";
import { Button } from 'reactstrap';
import Moment from 'react-moment';


const TodoItem = (props) => {
	const completedStyle = {
		fontStyle: "italic",
		color: "#cdcdcd",
		textDecoration: "line-through"
	}
	const yearNow = new Date().getFullYear();
	const yearTodo = new Date(props.item.date).getFullYear();
	const timeRegex = yearNow === yearTodo ? 'MMMM D' : "MMMM D, YYYY"
	const expires = <Moment format={timeRegex}>{props.item.date}</Moment>

	return (
		<div className="todo-item">
			<input type="checkbox" checked={props.item.completed} onChange={() => props.changeDone(props.id)} />
			<p style={props.item.completed ? completedStyle : null}>{props.item.todo} [{props.types[props.item.type]}]<p>{props.item.desc}</p>Deadline: {expires}</p>
			<Button onClick={() => props.delTodo(props.id)} className="delBtn" close />
		</div>
	)
}

export default TodoItem