import React from "react";
import { View, StyleSheet, Image, Button, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

class ChatScreen extends React.Component {
  state = {
    messages: [],
  };

  async onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    try {
      const response = await axios.post("http://10.0.2.2:3000/api", {
        message: message,
      });
      this.addResponse(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  clearChat = () => {
    this.setState({ messages: [] });
  };

  addResponse(response) {
    let msg = {
      _id: this.state.messages.length + 1,
      text: response,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot",
        avatar: require("./assets/Avatar-Profile-Vector.png"),
      },
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("./assets/Avatar-Profile-Vector.png")}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Geto</Text>
        </View>

        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
            avatar: require("./assets/User-Avatar-in-Suit-PNG.png"), // Local image file
          }}
          bubbleStyle={{
            backgroundColor: "#f0f0f0",
            borderRadius: 20,
          }}
          inputToolbarStyle={{
            backgroundColor: "#f8f8f8",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderColor: "#f8f8f8",
          }}
          renderBubble={(props) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf:
                      props.position === "left" ? "flex-start" : "flex-end",
                  }}
                >
                  <View
                    style={{
                      borderRadius: 20,
                      backgroundColor: "#f0f0f0",
                      padding: 10,
                      marginRight: props.position === "left" ? 10 : 0,
                      marginLeft: props.position === "right" ? 10 : 0,
                      maxWidth: "80%",
                    }}
                  >
                    <Text>{props.currentMessage.text}</Text>
                  </View>
                  {props.position === "right" && (
                    <Image
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                      source={require("./assets/User-Avatar-in-Suit-PNG.png")}
                    />
                  )}
                </View>
              </View>
            );
          }}
        />
        <Button title="Clear Chat" onPress={this.clearChat} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  inputToolbar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    backgroundColor: "blue",
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    color: "white",
  },
});

export default ChatScreen;
