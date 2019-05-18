import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  socket = socketIOClient("http://localhost:3000");

  state = {
    workshop: {
      judul: "",
      deskripsi: ""
    },
    task: {
      start: false,
      judul: "",
      durasi: 0
    }
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/workshop/1")
      .then(response => this.setState({ workshop: response.data }));
  }

  toggleStart() {
    const { task } = this.state;
    task.start = !task.start;
    this.setState({ task }, () => {
      if (this.state.task.start) this.startTimer();
      else this.stopTimer();
    });
  }

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

  startTimer() {
    this.timer = setInterval(() => {
      if (this.state.task.durasi > 0) {
        let { task } = this.state;
        task.durasi--;
        this.socket.emit("task", task);
        this.setState({ task });
      } else {
        this.toggleStart();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    const { task } = this.state;
    task.durasi = 0;
    this.setState({ task });
  }

  render() {
    return (
      <div>
        <h1>{this.state.workshop.judul}</h1>
        <p>{this.state.workshop.deskripsi}</p>

        {this.state.task.start ? (
          <div>
            <p align="center">{this.state.task.judul}</p>
            <p align="center">{this.state.task.durasi}</p>
            <button onClick={() => this.toggleStart()}>Berhenti</button>
          </div>
        ) : (
          <div>
            <div>
              <label>
                Judul Task
                <input
                  type="text"
                  value={this.state.task.judul}
                  onChange={event => this.changeJudul(event.target.value)}
                />
              </label>
            </div>

            <div>
              <label>
                Durasi Task
                <input
                  type="text"
                  value={this.state.task.durasi}
                  onChange={event => this.changeDurasi(event.target.value)}
                />
              </label>
            </div>
            <button onClick={() => this.toggleStart()}>Mulai</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
