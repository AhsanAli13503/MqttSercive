import React from "react";
import DashBoard from "./DashBoard";
import Header from "./Header";

class Login extends React.Component {
  state = {
    currentAppState: 0,
    userName: "",
    password: "",
    error: "",
  };

  checkValidity = () => {
    var check = this.state.userName.indexOf("/");
    console.log("check", check);
    if (check === -1) {
      this.setState({
        error: "/ must contain in username",
      });
    } else {
      this.setState({
        error: "",
      });
    }
  };

  onChangeText = (eve) => {
    const eve_target = eve.target.id;
    eve_target === "userName"
      ? this.setState(
          {
            userName: eve.target.value,
          },
          () => this.checkValidity()
        )
      : this.setState({
          password: eve.target.value,
        });
  };
  onLogin = () => {
    const { userName } = this.state;
    const { password } = this.state;
    if (userName.trim().length === 0 || password.trim().length === 0) {
      this.setState({
        error: "username/password must not be empty",
      });
    } else {
      this.setState({
        error: "",
        currentAppState: 1,
      });
    }
  };
  onLogout = () => {
    this.setState({
      currentAppState: 0,
    });
  };
  render() {
    return this.state.currentAppState === 0 ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header currentAppState={this.state.currentAppState} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Login</h1>
          <input
            id="userName"
            placeholder="topic name"
            style={{ padding: 5 }}
            onChange={this.onChangeText}
          />
          <br />
          <br />
          <input
            id="password"
            type="password"
            placeholder="password"
            style={{ padding: 5 }}
            onChange={this.onChangeText}
          />
          <p style={{ color: "#b60000", fontWeight: "bold" }}>
            {this.state.error}
          </p>
          <button
            onClick={this.onLogin}
            style={{
              backgroundColor: "#282c34",
              color: "white",
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            Login
          </button>
          <br />
          <br />
        </div>
      </div>
    ) : (
      <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
        <Header />
        <br></br>
        <DashBoard onLogout={this.onLogout} topicName ={this.state.userName} />
      </div>
      
    );
  }
}

export default Login;
