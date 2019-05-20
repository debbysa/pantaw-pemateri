import React, { Component } from "react";
import Task from "./components/Task";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

import socketIOClient from "socket.io-client";

export default class TaskPage extends Component {
  state = {
    task: {
      start: false,
      judul: "",
      durasi: 0
    }
  };

  socket = socketIOClient("http://localhost:3000");

  changeJudul(judul) {
    const { task } = this.state;
    task.judul = judul;
    this.setState({ task });
  }

  changeDurasi(durasi) {
    const { task } = this.state;
    task.durasi = durasi;
    this.setState({ task });
  }

  toggleTask() {
    const { task } = this.state;
    task.start = !task.start;
    this.setState({ task });
  }

  render() {
    return (
      <div>
        {this.state.task.start ? (
          <Task
            task={this.state.task}
            onStop={() => this.toggleTask()}
            onTick={timer =>
              this.socket.emit("task", { ...this.state.task, timer })
            }
          />
        ) : (
          <div align="center">
            <TextInput
              label="Judul Task"
              value={this.state.task.judul}
              onChange={value => this.changeJudul(value)}
            />

            <TextInput
              label="Durasi Task"
              value={this.state.task.durasi}
              onChange={value => this.changeDurasi(value)}
            />

            <Button onClick={() => this.toggleTask()} text="Mulai" />
          </div>
        )}
      </div>
    );
  }
}
