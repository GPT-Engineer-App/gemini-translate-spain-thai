import { Container, VStack } from "@chakra-ui/react";
import Chat from "../components/Chat";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Chat />
      </VStack>
    </Container>
  );
};

export default Index;