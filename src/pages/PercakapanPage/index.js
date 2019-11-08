import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import styled from "styled-components";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import HelpModal from "../../components/HelpModal";
import imgLogin from "../../assets/chat.jpeg";

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

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <Body>
        <button
          style={{ width: "100px", padding: "10px", border: "none" }}
          onClick={this.openModal}
        >
          help
        </button>
        <InputContainer>
          <TextInput
            label="Pesan"
            value={this.state.message}
            onChange={value => this.changeMessage(value)}
          />
          <Button onClick={() => this.sendMessage()} text="Kirim" />
        </InputContainer>

        <MessageContainer>
          {this.state.percakapan.map(item => (
            <Item
              style={{
                alignSelf: item.pemateri ? "flex-end" : "flex-start",
                backgroundColor: item.pemateri ? "#2285e3" : "#08c21c"
              }}
            >
              {item.peserta
                ? item.peserta.nama
                : item.pemateri.nama + " (pemateri) "}
              <p>{item.pesan}</p>
            </Item>
          ))}
        </MessageContainer>
        {/* modal */}

        <HelpModal
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
        >
          <img src={imgLogin} />
        </HelpModal>
      </Body>
    );
  }
}

const Body = styled.div`
  flex-direction: column;
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MessageContainer = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 500px;
  overflow-x: scroll;
`;

const Item = styled.ul`
  background-color: #2285e3;
  color: white;
  padding: 20px;
  border-radius: 5px;
`;
