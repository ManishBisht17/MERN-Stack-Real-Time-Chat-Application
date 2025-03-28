import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";

const Chat = () => {
  return (
    <Flex h="100vh">
      <Box w="300px" borderRight="1px solid" borderColor="gray.200">
        <Sidebar />
      </Box>
      <Box flex="1">
        <ChatArea />
      </Box>
    </Flex>
  );
};

export default Chat;
