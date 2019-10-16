import React from "react"
import { Button } from 'reactstrap'

const TodoItem = (props) => {
	const completedStyle = {
		fontStyle: "italic",
		color: "#cdcdcd",
		textDecoration: "line-through"
	}

	return (
		<div className="todo-item">
			<input type="checkbox" checked={props.item.completed} onChange={() => props.changeDone(props.id)} />
			<p style={props.item.completed ? completedStyle : null}>{props.item.todo}</p>
			<Button onClick={() => props.delTodo(props.id)} className="delBtn" close />
		</div>
	)
}

export default TodoItem