import "./App.css";
import React from "react";

import Login from "./Components/Login";

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <Login
          propsState={this.state}
          onLogin={this.onLogin}
          onChangeText={this.onChangeText}
          checkValidity={this.checkValidity}
        />
      </div>
    );
  }
}

export default App;
