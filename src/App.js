import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import "./App.css";
import styled from "styled-components";

const Title = styled.h1`
      padding: 10
      font-size: 1.5em
      color: #226b80
    `;
const ParagraphId = styled.p`
  text-align: right;
  padding: 20px
  border: 1px solid #aaa;
`;

const Tab = styled.div`
    overflow: hidden
    border: 1px solid #ccc
    background-color: #f1f1f1
    `;

const TabButton = styled.button`
  background-color: inherit
    float: left
    border: none
    cursor: pointer
    padding: 14px 16px
    transition: 0.3s
    font-size: 17px
    &:hover {
    background: #226b80;
    color: white;
  }
`;

class App extends Component {
  socket = socketIOClient("http://localhost:3000");

  state = {
    workshop: {
      id_workshop: "",
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
    task.judul = "";
    this.setState({ task });
  }

  render() {
    return (
      <div>
        <Title>{this.state.workshop.judul}</Title>
        <p>{this.state.workshop.deskripsi}</p>
        <ParagraphId>{this.state.workshop.id_workshop}</ParagraphId>

        <Tab>
          <TabButton>Tugas</TabButton>
          <TabButton>Peserta</TabButton>
          <TabButton>Percakapan</TabButton>
        </Tab>

        {this.state.task.start ? (
          <div align="center">
            <p align="center">{this.state.task.judul}</p>
            <p align="center">{this.state.task.durasi}</p>
            <button onClick={() => this.toggleStart()}>Berhenti</button>
          </div>
        ) : (
          <div align="center">
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
