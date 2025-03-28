import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Flex,
  Icon,
  Avatar,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FiSend, FiInfo, FiMessageCircle } from "react-icons/fi";
import UsersList from "./UsersList";

const ChatArea = () => {
  // Sample data for demonstration
  const sampleMessages = [
    {
      id: 1,
      content: "Hey team! Just pushed the new updates to staging.",
      sender: { username: "Sarah Chen" },
      createdAt: "10:30 AM",
      isCurrentUser: false,
    },
    {
      id: 2,
      content: "Great work! The new features look amazing 🚀",
      sender: { username: "Alex Thompson" },
      createdAt: "10:31 AM",
      isCurrentUser: false,
    },
    {
      id: 3,
      content: "Thanks! Let's review it in our next standup.",
      sender: { username: "You" },
      createdAt: "10:32 AM",
      isCurrentUser: true,
    },
  ];

  const sampleUsers = [
    { id: 1, username: "Sarah Chen", isOnline: true },
    { id: 2, username: "Alex Thompson", isOnline: true },
    { id: 3, username: "John Doe", isOnline: false },
  ];

  return (
    <Flex h="100%" position="relative">
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        bg="gray.50"
        maxW={`calc(100% - 260px)`}
      >
        {/* Chat Header */}
        <Flex
          px={6}
          py={4}
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200"
          align="center"
          boxShadow="sm"
        >
          <Icon as={FiMessageCircle} fontSize="24px" color="blue.500" mr={3} />
          <Box flex="1">
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Team Chat
            </Text>
            <Text fontSize="sm" color="gray.500">
              General Discussion
            </Text>
          </Box>
          <Icon
            as={FiInfo}
            fontSize="20px"
            color="gray.400"
            cursor="pointer"
            _hover={{ color: "blue.500" }}
          />
        </Flex>

        {/* Messages Area */}
        <VStack
          flex="1"
          overflowY="auto"
          spacing={4}
          align="stretch"
          px={6}
          py={4}
          position="relative"
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray.200",
              borderRadius: "24px",
            },
          }}
        >
          {sampleMessages.map((message) => (
            <Box
              key={message.id}
              alignSelf={message.isCurrentUser ? "flex-start" : "flex-end"}
              maxW="70%"
            >
              <Flex direction="column" gap={1}>
                <Flex
                  align="center"
                  mb={1}
                  justifyContent={
                    message.isCurrentUser ? "flex-start" : "flex-end"
                  }
                  gap={2}
                >
                  {message.isCurrentUser ? (
                    <>
                      <Avatar size="xs" name={message.sender.username} />
                      <Text fontSize="xs" color="gray.500">
                        You • {message.createdAt}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text fontSize="xs" color="gray.500">
                        {message.sender.username} • {message.createdAt}
                      </Text>
                      <Avatar size="xs" name={message.sender.username} />
                    </>
                  )}
                </Flex>

                <Box
                  bg={message.isCurrentUser ? "blue.500" : "white"}
                  color={message.isCurrentUser ? "white" : "gray.800"}
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <Text>{message.content}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </VStack>

        {/* Message Input */}
        <Box
          p={4}
          bg="white"
          borderTop="1px solid"
          borderColor="gray.200"
          position="relative"
          zIndex="1"
        >
          <InputGroup size="lg">
            <Input
              placeholder="Type your message..."
              pr="4.5rem"
              bg="gray.50"
              border="none"
              _focus={{
                boxShadow: "none",
                bg: "gray.100",
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                colorScheme="blue"
                borderRadius="full"
                _hover={{
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s"
              >
                <Icon as={FiSend} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>

      {/* UsersList with fixed width */}
      <Box
        width="260px"
        position="sticky"
        right={0}
        top={0}
        height="100%"
        flexShrink={0}
      >
        <UsersList users={sampleUsers} />
      </Box>
    </Flex>
  );
};

export default ChatArea;
