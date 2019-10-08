import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import todosData from './todosData'
import TodoItem from './TodoItem'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: todosData
    }
  }

  render() {
    const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} />)

    return (
      <div>
        <Header />
        <div className="todo-list">
          {todoItems}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
