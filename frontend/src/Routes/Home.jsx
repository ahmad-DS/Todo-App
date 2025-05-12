// import React from 'react'

// const Home = () => {
//   console.log("hi")
//   return (
//     <>
//       <h1>Welcome to Home page</h1>
//       <h2>It is a Todo website app</h2>
//       <h4>Designed and maintained by Shakil Ahmad</h4>
//     </>
//   )
// }

// export default Home

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Input,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const toast = useToast();

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    toast({
      title: "Todo would be added here.",
      description: "This is just a demo placeholder.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="600px" mx="auto" py={12} px={6} textAlign="center">
      <VStack spacing={6}>
        <Heading as="h1" size="2xl">
          Welcome to Todo App
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Organize your tasks and boost productivity. Simple. Fast. Effective.
        </Text>
        <Text fontSize="sm" color="gray.500">
          Designed and maintained by Shakil Ahmad
        </Text>

        <Button colorScheme="blue" size="lg" onClick={() => navigate("/signup")}>
          Get Started
        </Button>

        <Box w="100%" pt={10}>
          <Text fontWeight="bold" mb={2}>
            Add a Todo
          </Text>
          <VStack spacing={3}>
            <Tooltip
              label="Login to add todos"
              isDisabled={isLoggedIn}
              hasArrow
            >
              <Input
                variant="filled"
                placeholder={
                  isLoggedIn ? "Type your todo..." : "Login to activate"
                }
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                isDisabled={!isLoggedIn}
              />
            </Tooltip>
            <Button
              colorScheme="green"
              onClick={handleAdd}
              isDisabled={!isLoggedIn}
            >
              Add Todo
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
