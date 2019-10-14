import React from "react"

const TodoItem = (props) => {
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    return (
        <div className="todo-item">
            <input type="checkbox" checked={props.item.completed} onChange={() => props.changeDone(props.id, props.item.todo)} />
            <p style={props.item.completed ? completedStyle : null}>{props.item.todo}</p>
        </div>
    )
}

export default TodoItem