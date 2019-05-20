import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import WorkshopInfo from "./components/WorkshopInfo";

import TaskPage from "./pages/TaskPage";
import PesertaPage from "./pages/PesertaPage";
import PercakapanPage from "./pages/PercakapanPage";

class App extends Component {
  state = {
    workshop: {
      id_workshop: "",
      judul: "",
      deskripsi: ""
    }
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/workshop/1")
      .then(response => this.setState({ workshop: response.data }));
  }

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <WorkshopInfo workshop={this.state.workshop} />

        <Route path="/" exact component={TaskPage} />
        <Route path="/peserta" component={PesertaPage} />
        <Route path="/percakapan" component={PercakapanPage} />
      </BrowserRouter>
    );
  }
}

export default App;
