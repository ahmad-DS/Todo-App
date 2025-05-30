import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Badge,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

let token = localStorage.getItem("token") || "";

const TodoViewDrawer = ({ todo, isOpen, onClose, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);
  const toast = useToast();

  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  const handleUpdate = () => {
    fetch(`/api/todos/${todo._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedTodo),
    })
      .then((res) => res.json())
      .then(() => {
        onUpdate();
        setIsEditing(false);
        toast({ title: "Todo updated!", status: "success", duration: 2000 });
      })
      .catch(() => toast({ title: "Error updating todo", status: "error" }));
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          {isEditing ? "Edit Task" : "Task Details"}
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={6} mt={4}>
            {isEditing ? (
              <>
                <FormControl isRequired>
                  <FormLabel>Task Title</FormLabel>
                  <Input
                    value={editedTodo.title}
                    onChange={(e) =>
                      setEditedTodo({ ...editedTodo, title: e.target.value })
                    }
                    placeholder="Enter task title"
                    size="lg"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={editedTodo.description}
                    onChange={(e) =>
                      setEditedTodo({ ...editedTodo, description: e.target.value })
                    }
                    placeholder="Enter task description"
                    size="lg"
                    rows={4}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Due Date</FormLabel>
                  <Input
                    type="date"
                    value={editedTodo.dueDate}
                    onChange={(e) =>
                      setEditedTodo({ ...editedTodo, dueDate: e.target.value })
                    }
                    size="lg"
                  />
                </FormControl>

                <Box w="100%" p={4} bg="gray.50" borderRadius="lg">
                  <VStack spacing={4}>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0" fontWeight="bold">Urgent</FormLabel>
                      <Switch
                        isChecked={editedTodo.isUrgent}
                        onChange={(e) =>
                          setEditedTodo({ ...editedTodo, isUrgent: e.target.checked })
                        }
                        colorScheme="red"
                        size="lg"
                      />
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0" fontWeight="bold">Important</FormLabel>
                      <Switch
                        isChecked={editedTodo.isImportant}
                        onChange={(e) =>
                          setEditedTodo({ ...editedTodo, isImportant: e.target.checked })
                        }
                        colorScheme="blue"
                        size="lg"
                      />
                    </FormControl>
                  </VStack>
                </Box>
              </>
            ) : (
              <>
                <Box w="100%">
                  <Text fontWeight="bold" fontSize="xl" mb={2}>{todo.title}</Text>
                  {todo.description && (
                    <Text color="gray.600" mb={4}>{todo.description}</Text>
                  )}
                  {todo.dueDate && (
                    <Badge colorScheme="purple" mb={4}>
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </Badge>
                  )}
                </Box>

                <Divider />

                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>Priority Settings</Text>
                  <HStack spacing={4}>
                    <Badge colorScheme={todo.isUrgent ? "red" : "gray"}>
                      {todo.isUrgent ? "Urgent" : "Not Urgent"}
                    </Badge>
                    <Badge colorScheme={todo.isImportant ? "blue" : "gray"}>
                      {todo.isImportant ? "Important" : "Not Important"}
                    </Badge>
                  </HStack>
                </Box>

                <Divider />

                <Box w="100%">
                  <Text fontWeight="bold" mb={2}>Status</Text>
                  <Badge colorScheme={todo.status ? "green" : "yellow"}>
                    {todo.status ? "Completed" : "In Progress"}
                  </Badge>
                </Box>
              </>
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          {isEditing ? (
            <>
              <Button variant="outline" mr={3} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleUpdate}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                leftIcon={<EditIcon />}
                colorScheme="blue"
                mr={3}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                colorScheme={todo.status ? "gray" : "green"}
                mr={3}
                onClick={() => onToggle(todo._id, todo.status)}
              >
                {todo.status ? "Mark Incomplete" : "Mark Complete"}
              </Button>
              <Button colorScheme="red" onClick={() => onDelete(todo._id)}>
                Delete
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TodoViewDrawer; 