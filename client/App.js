import React from "react";
import { View, StyleSheet } from "react-native";
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

  addResponse(response) {
    let msg = {
      _id: this.state.messages.length + 1,
      text: response,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot",
        avatar: "https://placeimg.com/140/140/any",
      },
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default ChatScreen;
