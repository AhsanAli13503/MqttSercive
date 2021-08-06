import React from "react";
import battery from "../Battery.jpg";
class DashBoard extends React.Component {
  state = {
    batteryData: [],
  };

  componentDidMount() {
    this.dataFromHardware();
    this.dataApi();
  }
  dataApi = () => {
    setInterval(() => {
      this.dataFromHardware();
    }, 10000);
  };
  dataFromHardware = async () => {
    //console.log(this.props.topicName)
    let { topicName } = this.props;
    let url = `/api?userName=${topicName}`;
    let res = await fetch(url);
    res = await res.json();
    //console.log("res",res)
    let { message } = res;

    let _size = message.length;
    let newArray = [];
    var data = [];
    let volt = 0
    for (let i = 0; i < _size/2; i++) {
      volt = message[i*2];
      volt = volt + (message[i*2+1] << 8);
      volt = volt /1000.0;
      if ((i+1)%3 === 0) 
      {
        data.push(volt)
        newArray.push(data);
        data = [];
      }
      else{
        data.push(volt)
      } 
      
    }
    this.setState({
      batteryData: newArray,
    });
  };

  battery = (batteryData, index) => (
    <div
      style={{
        display: "flex",
        margin: "10px",
      }}
    >
      <img
        alt="battery"
        src={battery}
        style={{ widows: "80px", height: "80px", transform: " rotate(90deg)" }}
      />
      <div
        style={{
          textAlign: "center",
          color: "black",
          fontWeight: "bold",
          marginTop: "25px",
        }}
      >
        {batteryData}
      </div>
    </div>
  );
  render() {
    const { batteryData } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            backgroundColor: "#84e09d",
            color: "white",
            width: "20%",
            borderRadius: 10,
            elevation: 1,
          }}
        >
          <h1
            style={{
              marginLeft: "10px",
              fontWeight: "bold",
              fontFamily: "Candara",
              fontStyle: "italic",
              fontSize: "20px",
            }}
          >
            DashBoard
          </h1>
          <h2
            style={{
              marginLeft: "10px",
              fontWeight: "bold",
              fontFamily: "Candara",
              fontStyle: "italic",
              fontSize: "20px",
              width: "90%",
            }}
          >
            bms
          </h2>
          <h2
            style={{
              marginLeft: "10px",
              fontWeight: "bold",
              fontFamily: "Candara",
              fontStyle: "italic",
              fontSize: "20px",
              paddingRight: "10px",
            }}
            onClick={() => this.props.onLogout()}
          >
            logout
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Candara",
            fontStyle: "italic",
            fontSize: "15px",
            // backgroundColor:'#f5f9ff'
          }}
        >
          {batteryData.length === 0 ? (
            <div>No Data publish on Topic:{this.props.topicName}</div>
          ) : (
            batteryData.map((data, indec) => (
              <div key={indec} style={{ display: "flex" }}>
                {data.map((batteryData, index) =>
                  this.battery(batteryData, index)
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default DashBoard;
