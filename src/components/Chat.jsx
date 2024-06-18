import React, { useState } from "react";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (lowerCaseMessage.includes("yes")) {
      return "You said yes!";
    } else if (lowerCaseMessage.includes("no")) {
      return "You said no!";
    } else {
      return "I'm not sure how to respond to that.";
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: getBotResponse(input) };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" width="100%" maxW="md">
      <VStack spacing={4}>
        <Box width="100%" height="300px" overflowY="scroll" borderWidth={1} borderRadius="md" p={2}>
          {messages.map((msg, index) => (
            <Box key={index} p={2} borderBottomWidth={1} textAlign={msg.sender === "bot" ? "left" : "right"}>
              <Text fontWeight="bold">{msg.sender === "bot" ? "Bot:" : "You:"}</Text>
              <Text>{msg.text}</Text>
            </Box>
          ))}
        </Box>
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSend} colorScheme="blue">
          Send
        </Button>
      </VStack>
    </Box>
  );
};

export default Chat;