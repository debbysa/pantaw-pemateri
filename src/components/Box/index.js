import React, { Component } from "react";
import styled from "styled-components";
import item from "../../pages/PesertaPage/index";

export default class Box extends Component {
  render() {
    return (
      <div>
        <Container>
          <p>{item.id_peserta}</p>
          <p>{item.status.status}</p>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  align-content: stretch;
`;
