import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import todosData from './todosData'
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

const App = () => {
  const todoItems = localStorage.getItem('todolist').map((item) => <TodoItem item={item} />);

  return (
    <div>
      <Header />
      <div className="todo-list">
        <AddForm />
      </div>
      <Footer />
    </div>
  )
}

export default App;
