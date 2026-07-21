import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Input,
  Tooltip,
  useToast,
  Container,
  Stack,
  HStack,
  Badge,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, CheckCircleIcon } from "@chakra-ui/icons";

const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const toast = useToast();
  const panelBg = useColorModeValue("white", "gray.800");

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
    <Container maxW="7xl" py={{ base: 8, md: 14 }} px={{ base: 4, md: 6 }}>
      <Box
        bgGradient="linear(135deg, blue.50 0%, purple.50 35%, teal.50 100%)"
        borderRadius="3xl"
        boxShadow="xl"
        p={{ base: 8, md: 12 }}
      >
        <Stack direction={{ base: "column", lg: "row" }} spacing={10} align="center">
          <VStack align="flex-start" spacing={5} flex="1">
            <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full">
              Productivity • Focus • Daily wins
            </Badge>
            <Heading as="h1" size={{ base: "xl", md: "2xl" }} lineHeight="1.1">
              Plan your day with a calmer, cleaner todo experience.
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Organize your priorities with a simple workspace that feels easier to maintain.
            </Text>
            <HStack spacing={3} flexWrap="wrap">
              <Button colorScheme="blue" size="lg" onClick={() => navigate("/signup")}>
                Create account
              </Button>
              <Button variant="outline" colorScheme="blue" size="lg" onClick={() => navigate("/todos")}>
                Explore todos
              </Button>
            </HStack>
          </VStack>

          <Box flex="1" w="full" maxW="480px" bg={panelBg} borderRadius="2xl" p={6} boxShadow="lg">
            <Text fontWeight="bold" mb={3}>
              Quick add
            </Text>
            <VStack spacing={3} align="stretch">
              <Tooltip label="Login to add todos" isDisabled={isLoggedIn} hasArrow>
                <Input
                  variant="filled"
                  placeholder={isLoggedIn ? "Type your todo..." : "Login to activate"}
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  isDisabled={!isLoggedIn}
                  size="lg"
                />
              </Tooltip>
              <Button colorScheme="green" onClick={handleAdd} isDisabled={!isLoggedIn} size="lg">
                Add Todo
              </Button>
            </VStack>

            <SimpleGrid columns={2} spacing={3} mt={6}>
              <Box p={3} borderRadius="lg" bg="blue.50">
                <CalendarIcon color="blue.500" mb={2} />
                <Text fontSize="sm" fontWeight="semibold">Stay organized</Text>
              </Box>
              <Box p={3} borderRadius="lg" bg="green.50">
                <CheckCircleIcon color="green.500" mb={2} />
                <Text fontSize="sm" fontWeight="semibold">Track progress</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
