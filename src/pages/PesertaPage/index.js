import React, { Component } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import styled from "styled-components";

export default class PesertaPage extends Component {
  state = {
    detailWorkshop: []
  };

  socket = socketIOClient("http://localhost:3000");

  componentDidMount() {
    axios
      .get("http://localhost:3000/workshop/1/detail/")
      .then(response => this.setState({ detailWorkshop: response.data }));

    this.socket.on("detail", detailWorkshop =>
      this.setState({ detailWorkshop })
    );
  }

  render() {
    return (
      <div>
        {this.state.detailWorkshop.map(item => (
          <Container>
            <p>{item.peserta.nama}</p>
            <p>{item.status.status}</p>
          </Container>
        ))}
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  flex-direction: row;
  border: 0.5em solid #ffbb73;
  /* align-content: stretch; */
`;
