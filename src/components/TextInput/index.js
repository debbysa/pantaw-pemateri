import React, { Component } from "react";
import styled from "styled-components";

export default class TextInput extends Component {
  render() {
    return (
      <div>
        <label>
          <LabelText>{this.props.label}</LabelText>
          <Input
            type="text"
            placeholder={`Masukkan ${this.props.label}`}
            value={this.props.value}
            onChange={event => this.props.onChange(event.target.value)}
          />
        </label>
      </div>
    );
  }
}

const LabelText = styled.p`
  margin-bottom: 15px;
`;

const Input = styled.input`
  padding: 10px 15px;
  border-radius: 5px;
  border: solid 2px #5b5b5b;
  outline: none;
  transition: 0.5s;

  &:focus {
    border-color: #3d85ff;
    transition: 0.5s;
  }
`;
