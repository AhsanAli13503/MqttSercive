import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="App-header">
        <h1 style={{ fontFamily: "Candara", fontSize: "30px" }}>bms</h1>
        <p
          style={{
            marginLeft: 10,
            paddingTop: 5,
            fontFamily: "Candara",
            fontStyle: "italic",
            fontSize: "15px",
            
          }}
        >
          A Managment And Analytics
        </p>
        
      </div>
    );
  }
}
export default Header;
