import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  Stack,
  Heading,
  useToast,
  Container,
  Badge,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

let token = localStorage.getItem("token") || "";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const emptyStateBg = useColorModeValue("gray.50", "gray.700");
  const pendingCardBg = useColorModeValue("gray.50", "gray.700");
  const completedCardBg = useColorModeValue("green.50", "green.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const completedBorder = useColorModeValue("green.200", "green.700");
  const titleColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");

  const getTodos = () => {
    fetch("/api/todos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => setTodos(res.data || []))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    fetch(`/api/todos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTodo }),
    })
      .then((res) => res.json())
      .then(() => {
        getTodos();
        setNewTodo("");
        toast({ title: "Todo added!", status: "success", duration: 2000 });
      })
      .catch(() => toast({ title: "Error adding todo", status: "error" }));
  };

  const handleToggle = (id, status) => {
    fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: !status }),
    })
      .then((res) => res.json())
      .then(() => getTodos());
  };

  const handleDelete = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        getTodos();
        toast({ title: "Todo deleted", status: "info", duration: 2000 });
      });
  };

  return (
    <Container maxW="760px" py={{ base: 8, md: 12 }} px={4}>
      <Box bg={cardBg} borderRadius="3xl" boxShadow="xl" p={{ base: 6, md: 8 }} borderWidth="1px">
        <Stack spacing={6}>
          <Stack spacing={1}>
            <Heading textAlign="center" size="lg">
              Task board
            </Heading>
            <Text textAlign="center" color={secondaryTextColor}>
              Keep your priorities visible and your day calm.
            </Text>
          </Stack>

          <Flex gap={3} mb={2} direction={{ base: "column", md: "row" }}>
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              variant="filled"
              size="lg"
            />
            <Button colorScheme="blue" size="lg" onClick={addTodo}>
              Add task
            </Button>
          </Flex>

          <Stack spacing={3}>
            {todos.length === 0 ? (
              <Box p={5} borderRadius="xl" bg={emptyStateBg} textAlign="center" color={secondaryTextColor}>
                No tasks yet. Add your first one above.
              </Box>
            ) : (
              todos.map((el, idx) => (
                <Flex
                  key={el._id}
                  p={4}
                  borderRadius="2xl"
                  align="center"
                  justify="space-between"
                  bg={el.status ? completedCardBg : pendingCardBg}
                  direction={{ base: "column", md: "row" }}
                  borderWidth="1px"
                  borderColor={el.status ? completedBorder : borderColor}
                  boxShadow="sm"
                  _hover={{ transform: "translateY(-1px)", transition: "all 0.2s ease" }}
                >
                  <Flex
                    direction="column"
                    flex="1"
                    align={{ base: "center", md: "flex-start" }}
                    textAlign={{ base: "center", md: "left" }}
                    mb={{ base: 3, md: 0 }}
                    minW={0}
                  >
                    <Text fontWeight="bold" color={titleColor} isTruncated maxW="100%">
                      {idx + 1}. {el.title}
                    </Text>
                    <Badge colorScheme={el.status ? "green" : "red"} mt={2} borderRadius="full" px={3} py={1}>
                      {el.status ? "Done" : "Not Done"}
                    </Badge>
                  </Flex>

                  <Flex gap={2} align="center">
                    <Switch
                      colorScheme="green"
                      size="lg"
                      isChecked={el.status}
                      onChange={() => handleToggle(el._id, el.status)}
                      aria-label={`Toggle todo ${idx + 1}`}
                    />
                    <Button colorScheme="red" variant="outline" onClick={() => handleDelete(el._id)}>
                      <DeleteIcon />
                    </Button>
                  </Flex>
                </Flex>
              ))
            )}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Todos;
