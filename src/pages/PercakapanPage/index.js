import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import styled from "styled-components";

export default class PercakapanPage extends Component {
  state = {
    percakapan: []
  };

  socket = socketIOClient("http://localhost:3000");

  componentDidMount() {
    axios
      .get("http://localhost:3000/workshop/1/percakapan")
      .then(response => this.setState({ percakapan: response.data }));

    this.socket.on("percakapan", percakapanItem => {
      const { percakapan } = this.state;
      percakapan.push(percakapanItem);
      this.setState({ percakapan });
    });
  }

  render() {
    return (
      <Body>
        {this.state.percakapan.map(item => (
          <Item>
            <li>
              {item.id_pengirim}
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
