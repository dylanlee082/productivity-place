import React, { Component } from "react";
import "./reset.css";
import routes from "./routes";
import Breakpoint from "react-socks";
import Mobile from "./components/Mobile/Mobile";

class App extends Component {
  render() {
    return (
      <div>
        <Breakpoint medium down>
          <Mobile />
        </Breakpoint>
        <Breakpoint large up>
          <div className="App">{routes}</div>
        </Breakpoint>
      </div>
    );
  }
}

export default App;
