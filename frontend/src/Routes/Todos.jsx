import {
  Box,
  Button,
  Input,
  HStack,
  Flex,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
let token = localStorage.getItem("token") || "";
const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    fetch("/api/todos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  };

  //delete request

  useEffect(() => {
    getTodos();
  }, []);

  //add new todo
  const addTodo = () => {
    // console.log("added")
    fetch(`/api/todos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTodo }),
    })
      .then((res) => res.json())
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log("there", err);
      });
  };

  const handleToggle = (id, status) => {
    status = status ? false : true;
    fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((res) => {
        getTodos();
        setNewTodo("");
      })
      .catch((err) => {
        console.log("there", err);
      });
  };
  const handleDelete = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body:JSON.stringify({status})
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getTodos();
      })
      .catch((err) => {
        console.log("there", err);
      });
  };

  return (
    <Box>
      <HStack w={500} margin={"auto"} mt={10} p={"2rem"}>
        <Input
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          variant="filled"
          type="text"
          placeholder="write something"
        />
        <Button
          cursor={"pointer"}
          bg={"blue.400"}
          color={"white"}
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </HStack>
      <Heading>Your Todos</Heading>
      <Stack
        w={"auto"}
        p={"2rem"}
        boxShadow={" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        spacing={5}
        mt={10}
        textAlign={"center"}
        alignItems={"center"}
        margin={"auto"}
      >
        {todos?.map((el, idx) => {
          return (
            <Flex
              textTransform={"uppercase"}
              key={idx}
              p={"0.5rem"}
              boxShadow={
                "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
              }
              textAlign={"center"}
              gap={20}
              direction={"row"}
              alignItems={"center"}
              fontWeight={"bold"}
              justifyContent={"space-arround"}
            >
              <Box w={180}>
                <Text>{idx + 1}</Text>
              </Box>
              <Box w={180}>
                <Text>{el.title}</Text>
              </Box>
              <Box w={180}>
                <Text>
                  {el.status ? (
                    <span style={{ color: "#188556" }}>Done </span>
                  ) : (
                    <span style={{ color: "red" }}>Not Done</span>
                  )}
                </Text>
              </Box>
              <Box w={180}>
                <Button
                  bg={"blue.400"}
                  cursor={"pointer"}
                  color={"white"}
                  onClick={() => {
                    handleToggle(el._id, el.status);
                  }}
                >
                  {!el.status ? <BsToggleOff /> : <BsToggleOn />}
                </Button>
              </Box>
              <Box w={180}>
                <Button
                  bg={"blue.400"}
                  cursor={"pointer"}
                  color={"white"}
                  onClick={() => {
                    handleDelete(el._id);
                  }}
                >
                  <DeleteIcon color={"red"} />
                </Button>
              </Box>
            </Flex>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Todos;
