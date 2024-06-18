import React, { useState } from "react";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const translateMessage = async (message) => {
    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: message,
            source: "es",
            target: "th",
            key: "YOUR_API_KEY", // Replace with your actual API key
          },
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Error translating message:", error);
      return "Translation error";
    }
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const translatedMessage = await translateMessage(input);
    setMessages([...messages, { original: input, translated: translatedMessage }]);
    setInput("");
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" width="100%" maxW="md">
      <VStack spacing={4}>
        <Box width="100%" height="300px" overflowY="scroll" borderWidth={1} borderRadius="md" p={2}>
          {messages.map((msg, index) => (
            <Box key={index} p={2} borderBottomWidth={1}>
              <Text fontWeight="bold">Original (ES):</Text>
              <Text>{msg.original}</Text>
              <Text fontWeight="bold" mt={2}>Translated (TH):</Text>
              <Text>{msg.translated}</Text>
            </Box>
          ))}
        </Box>
        <Input
          placeholder="Type your message in Spanish..."
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