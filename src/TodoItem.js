import React from "react"

function TodoItem(props) {
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    return (
        <div className="todo-item">
            <input type="checkbox" checked={props.item.completed} />
            <p style={props.item.completed ? completedStyle : null}>{props.item.todo}</p>
        </div>
    )
}

export default TodoItem