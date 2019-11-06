import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export default class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  render() {
    return (
      <Nav>
        <Link to="/">
          <NavItem>Task</NavItem>
        </Link>
        <Link to="/peserta">
          <NavItem>Peserta</NavItem>
        </Link>
        <Link to="/percakapan">
          <NavItem>Percakapan</NavItem>
        </Link>
        <NavItem onClick={this.openModal}>Help</NavItem>
        
      </Nav>
    );
  }
}

const Nav = styled.div`
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
`;

const NavItem = styled.button`
  background-color: inherit;
  float: left;
  border: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
  &:hover {
    background: #226b80;
    color: white;
  }
`;
