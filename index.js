/**
 * modules importing
 *
 */
const express = require("express");
var mqtt = require("mqtt");
var fs = require("fs");
const path = require("path");

/**
 * Data Part
 *
 */

const readAllData = () => {
  try {
    var data = fs.readFileSync("./topics.json"),
      myObj = JSON.parse(data);
    return myObj;
  } catch (err) {
    console.log("There has been an error parsing your JSON.");
    console.log(err);
    return {
      topics: [],
      lastMessages: [],
    };
  }
};

const savelastMessageTopicName = (dataObjet) => {
  AppData.push(dataObjet);
  var data = JSON.stringify(AppData);
  fs.writeFile("./topics.json", data, function (err) {
    if (err) {
      console.log("There has been an error saving your configuration data.");
      console.log(err.message);
      return;
    }
    console.log("Configuration saved successfully.");
  });
  console.log("AppData", AppData[0].topic);
};


function findElement(arr, n, topic) {
  let i;
  for (i = 0; i < n; i++) if (arr[i].topic == topic) return i;
  return -1;
}

const searchLastMsgIndex = (topic) => {
  return findElement(AppData, AppData.length, topic);
};

updateAppData = (TopicIndex, update) => {
  AppData[TopicIndex].message = update;
};


var AppData = readAllData(); // have all app data


/**
 * mqtt 
 */

var options = {
  host: "broker.hivemq.com",
  port: 1883,
  //protocol: "mqtts",
  username: "ahsan",
  password: "AhsanAli1",
};

var client = mqtt.connect(options);
client.on("connect", function () {
  console.log("Connected");
});

client.on("error", function (error) {
  console.log(error);
});
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/api", async (req, res) => {
  let topic = req.query.userName;
  client.subscribe(topic);
  var messageIndex = searchLastMsgIndex(topic);
  client.on("message", function (topic1, message) {
    client.end();
    message = message.toJSON();
    if (messageIndex === -1) {
      savelastMessageTopicName({ topic: topic, message: message.data });
    } else {
      updateAppData(messageIndex, message.data);
    }
  });
  if (messageIndex === -1) {
    res.send(JSON.stringify({ topic: topic, message: [] }));
  } else {
    res.send(
      JSON.stringify({
        topic: AppData[messageIndex].topic,
        message: AppData[messageIndex].message,
      })
    );
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

