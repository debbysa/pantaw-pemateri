import React, { Component } from "react";
import styled from "styled-components";

export default class WorkshopInfo extends Component {
  render() {
    return (
      <Container>
        <div>
          <Title>{this.props.workshop.judul}</Title>
          <p>{this.props.workshop.deskripsi}</p>
        </div>

        <div>
          Workshop ID
          <TextID>{this.props.workshop.id_workshop}</TextID>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const Title = styled.h1`
  padding: 10;
  font-size: 1.5em;
  color: #226b80;
`;

const TextID = styled.p`
  font-weight: bold;
  text-align: center;
`;
