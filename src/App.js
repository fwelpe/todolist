import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import todosData from './todosData'
import TodoItem from './TodoItem'
import AddForm from './AddForm'


class App extends React.Component {
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
    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host: '95.165.129.236',
      user: 'root',
      password: 'ewe4',
      database: 'gru'
    });

    connection.connect()

    connection.query('SELECT * FROM users', function (err, rows, fields) {
      if (err) throw err

      console.log('The solution is: ', rows)
    })

    connection.end()
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
}

export default App;
