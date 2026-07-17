import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

let token = localStorage.getItem("token") || "";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const toast = useToast();

  const getTodos = () => {
    fetch("/api/todos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => setTodos(res.data))
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
    <Box maxW="600px" mx="auto" py={10} px={4}>
      <Heading mb={6} textAlign="center">
        Todo Manager
      </Heading>

      <Flex gap={3} mb={8}>
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          variant="filled"
        />
        <Button colorScheme="blue" onClick={addTodo}>
          Add
        </Button>
      </Flex>

      <Stack spacing={4}>
        {todos.map((el, idx) => (
          <Flex
            key={el._id}
            p={4}
            boxShadow="md"
            borderRadius="md"
            align="center"
            justify="space-between"
            bg="gray.50"
            direction={{ base: "column", md: "row" }}
          >
            <Flex
              direction="column"
              flex="1"
              align={{ base: "center", md: "flex-start" }}
              textAlign={{ base: "center", md: "left" }}
              mb={{ base: 3, md: 0 }}
            >
              <Text fontWeight="bold" isTruncated maxW="100%">
                {idx + 1}. {el.title}
              </Text>
              <Text
                fontSize="sm"
                color={el.status ? "green.500" : "red.400"}
                mt={1}
              >
                {el.status ? "Done" : "Not Done"}
              </Text>
            </Flex>

            <Flex gap={2}>
              <Button
                onClick={() => handleToggle(el._id, el.status)}
                colorScheme={el.status ? "green" : "gray"}
              >
                {el.status ? (
                  <BsToggleOn size={20} />
                ) : (
                  <BsToggleOff size={20} />
                )}
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(el._id)}>
                <DeleteIcon />
              </Button>
            </Flex>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default Todos;
