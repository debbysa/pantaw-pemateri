import React, { Component } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

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
          <div>
            <p>{item.id_peserta}</p>
            <p>{item.status.status}</p>
          </div>
        ))}
      </div>
    );
  }
}
