import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import apiURL from "../../utils";

const ENDPOINT = apiURL;

const Chat = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || {});
    const newSocket = io(ENDPOINT, {
      auth: { user: userInfo },
    });
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);
  return (
    <Flex h="100vh" direction={{ base: "column", md: "row" }}>
      <Box
        w={{ base: "100%", md: "300px" }}
        h={{ base: "auto", md: "100vh" }}
        borderRight="1px solid"
        borderColor="gray.200"
        display={{ base: selectedGroup ? "none" : "block", md: "block" }}
      >
        <Sidebar setSelectedGroup={setSelectedGroup} />
      </Box>
      <Box
        flex="1"
        display={{ base: selectedGroup ? "block" : "none", md: "block" }}
      >
        {socket && (
          <ChatArea
            selectedGroup={selectedGroup}
            socket={socket}
            setSelectedGroup={setSelectedGroup}
          />
        )}
      </Box>
    </Flex>
  );
};

export default Chat;
