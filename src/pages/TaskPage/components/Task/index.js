import React, { Component } from "react";
import Button from "../../../../components/Button";

export default class Task extends Component {
  state = {
    timer: this.props.task.durasi
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.state.timer > 0) {
        let { timer } = this.state;
        timer--;
        this.props.onTick(timer);
        this.setState({ timer });
      } else {
        clearInterval(this.timer);
        this.props.onStop();
      }
    }, 1000);
  }

  render() {
    return (
      <div align="center">
        <p align="center">{this.props.task.judul}</p>
        <p align="center">{this.state.timer}</p>
        <Button onClick={() => this.props.onStop()} text="Berhenti" />
      </div>
    );
  }
}
