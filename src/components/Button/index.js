import React, { Component } from "react";
import styled from "styled-components";

export default class Button extends Component {
  render() {
    return (
      <StyledButton onClick={() => this.props.onClick()}>
        {this.props.text}
      </StyledButton>
    );
  }
}

const StyledButton = styled.button`
  margin: 10px;
  padding: 5px 10px;
  border: solid 1px transparent;
  background-color: #27a5db;
  color: white;
`;
