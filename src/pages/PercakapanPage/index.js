import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import styled from "styled-components";

export default class PercakapanPage extends Component {
  state = {
    percakapan: [],
    message: ""
  };

  socket = socketIOClient("http://localhost:3000");

  componentDidMount() {
    axios
      .get("http://localhost:3000/workshop/1/percakapan")
      .then(response => this.setState({ percakapan: response.data }));

    this.socket.on("percakapan", percakapan => {
      this.setState({ percakapan });
    });
  }

  changeMessage(value) {
    this.setState({ message: value });
  }

  sendMessage() {
    axios
      .post("http://localhost:3000/workshop/1/percakapan", {
        id_pengirim: 1,
        pesan: this.state.message
      })
      .then(response => {
        this.socket.emit("percakapan", 1);
        this.setState({ message: "" });
      });
  }

  render() {
    return (
      <Body>
        <input
          type="text"
          value={this.state.message}
          onChange={event => this.changeMessage(event.target.value)}
        />
        <button onClick={() => this.sendMessage()}>Kirim</button>
        {this.state.percakapan.map(item => (
          <Item>
            <li>
              {item.peserta
                ? item.peserta.nama
                : item.pemateri.nama + " (pemateri) "}
              <p>{item.pesan}</p>
            </li>
          </Item>
        ))}
      </Body>
    );
  }
}

const Body = styled.div`
  flex-direction: column;
  display: flex;
`;

const Item = styled.ul`
  /* padding: 2em 2em; */
`;
