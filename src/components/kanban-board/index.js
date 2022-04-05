import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        { name: 'Update user', stage: 0 },
        { name: 'Delete user', stage: 0 },
      ],
      name: ''
    };
    this.stagesNames = ['Backlog', 'To Do', 'In Progress', 'Completed'];
    this.createTask = this.createTask.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  createTask() {
    this.setState(prevState => ({
      tasks: [...prevState.tasks, { name: this.state.name, stage: 1 }]
    }))
  }


  onDelete(task) {
    console.log(task)
    //  update stage here
    this.setState({
      tasks: this.state.tasks.filter(item => item.name !== task.name)
    })
  }

  updateStage(task, isNext) {
    const idx = this.state.tasks.findIndex((t => t.name === task.name));
    const updatedTask = { ...task, stage: isNext ? task.stage + 1 : task.stage - 1 }
    this.setState({
      tasks: [
        ...this.state.tasks.slice(0, idx),
        updatedTask,
        ...this.state.tasks.slice(idx + 1)
      ]
    });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input onChange={(e) => { this.handleChange(e) }} id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" />
          <button type="submit" className="ml-30" data-testid="create-task-button" onClick={this.createTask}>Create task</button>
        </section>
        <section>
          <div className="small">Each task is uniquely identified by its name</div>
        </section>

        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="p-4 bg-color-red"></div>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                          <div className="icons">
                            <button disabled={task.stage === 0} onClick={() => this.updateStage(task, false)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button disabled={task.stage === 3} onClick={() => this.updateStage(task, true)} className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button onClick={() => this.onDelete(task)} className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}