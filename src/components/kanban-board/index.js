import React, { Component } from "react";
import { Button, Input } from 'antd';
import { Card, Col, Row, Typography, Space, Layout, message } from 'antd';
import { VerticalCard } from "../VerticalCard";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
        { name: '1', stage: 0 },
        { name: '2', stage: 0 },
      ],
      name: '',
      loading: false
    };
    this.stagesNames = ['Backlog', 'To Do', 'In Progress', 'Completed'];
    this.createTask = this.createTask.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  createTask() {
    if (this.state.name) {
      if (this.state.tasks.find(item => item.name === this.state.name)) {
        message.error(`Task ${this.state.name} is already exist.`);
      } else {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState(prevState => ({
            tasks: [...prevState.tasks, { name: this.state.name, stage: 1 }]
          }));
          message.success(`Task ${this.state.name} is created successfully.`);
          this.setState({ name: '' });
          this.setState({ loading: false });
        }, 1000);
      }
    } else {
      message.info(`Task name is required.`);
    }
  }


  onDelete(task) {
    this.setState({
      tasks: this.state.tasks.filter(item => item.name !== task.name)
    });
    message.info(`Task ${task.name} is deleted successfully.`);
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

  confirm(task) {
    this.onDelete(task);
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
      <Layout style={{ flex: 1, height: "100%", width: "100%", padding: 20 }}>
        <Space direction="horizontal">
          <Input
            placeholder="Enter task name"
            type={"text"}
            id="name"
            name="name"
            value={this.state.name}
            onChange={(e) => { e.preventDefault(); this.handleChange(e) }}
          />
          <Button
            type="primary"
            shape="round"
            onClick={this.createTask}
            loading={this.state.loading}>
            Create Task
          </Button>
        </Space>
        <Col style={{ marginTop: 4, marginBottom: 20 }}>
          <Typography.Text style={{ fontSize: 12 }}>
            Each task is uniquely identified by its name
          </Typography.Text>
        </Col>

        <Row gutter={16}>
          {stagesTasks.map((tasks, i) => {
            return (
              <Col span={6} key={i.toString()}>
                <Card title={this.stagesNames[i]} bordered={false}>
                  {tasks.map((task, idx) => <VerticalCard
                    idx={idx}
                    task={task}
                    onDelete={(task) => this.confirm(task)}
                    updateStage={(task, flag) => this.updateStage(task, flag)}
                  />
                  )}
                </Card>
              </Col>
            )
          })}
        </Row>
      </Layout>
    );
  }
}