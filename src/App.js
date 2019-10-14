import React, { useState } from 'react';
import './App.css';
import Header from './Header.js';
import TodoItem from './TodoItem'
import AddForm from './AddForm'

/* class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: todosData,
            // todos2: this.getData()
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(id) {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((el) => {
                if (el.id === id)
                    el.completed = !el.completed
                return el;
            }
            )
            return {
                todos: updatedTodos
            }
        })
    }

    getData() {
        const data = {
            l: 'root',
            p: 'ewe4',
            req: 'insert into todolist (todo) values ("vsdf")'
        }

        fetch('http://95.165.129.236:8080/r.php', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })

    }

    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange} />)

        return (
            <div>
                <Header />
                <div className="todo-list">
                    <AddForm />
                    {todoItems}
                </div>
                <Footer />
            </div>
        )
    }
} */

function App() {
	function getTodoArr() {
		const todoItemsArr = [];
		if (localStorage.todolist) {
			const todosObj = JSON.parse(localStorage.todolist);
			for (let keyIter in todosObj) {
				todoItemsArr.push(<TodoItem item={todosObj[keyIter]} />);
			}
		}
		return todoItemsArr;
	}

	const [todoItems, setTodoItems] = useState(getTodoArr());

	function newTodo(todoObj) {
		const newTodosObj = JSON.parse(localStorage.getItem('todolist')) || {}
		function getNewIndex() {
			const ids = Object.keys(newTodosObj)
			const getIndex = (acc, val) => {
				const numVal = Number(val)
				return numVal >= acc ? numVal + 1 : acc
			}
			return ids.reduce(getIndex, 0)
		}
		const newIndex = getNewIndex()
		setTodoItems([...todoItems, <TodoItem key={newIndex} item={todoObj} />])
		newTodosObj[newIndex] = todoObj
		localStorage.setItem('todolist', JSON.stringify(newTodosObj))
	}

	return (
		<div>
			<Header />
			<div className="todo-list">
				<AddForm handleSubmit={newTodo} />
				{todoItems}
			</div>
		</div>
	)
}

export default App;
