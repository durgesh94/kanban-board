import React, { Component } from 'react';
import './App.css';
import KanbanBoard from './components/kanban-board/index.js';

class App extends Component {
  render() {
    return (
      <div>
        <KanbanBoard/>
      </div>
    );
  }
}

export default App;
