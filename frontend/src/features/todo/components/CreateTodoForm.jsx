import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const CreateTodoForm = ({ isOpen, onClose, onTodoCreated }) => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    isUrgent: false,
    isImportant: false,
  });
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const data = await response.json();
      onTodoCreated(data);
      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
        isUrgent: false,
        isImportant: false,
      });
      onClose();
      toast({
        title: "Task created",
        description: "Your new task has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })
                  }
                  placeholder="Enter task title"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newTodo.description}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, description: e.target.value })
                  }
                  placeholder="Enter task description"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, dueDate: e.target.value })
                  }
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Urgent</FormLabel>
                <Switch
                  isChecked={newTodo.isUrgent}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, isUrgent: e.target.checked })
                  }
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Important</FormLabel>
                <Switch
                  isChecked={newTodo.isImportant}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, isImportant: e.target.checked })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Create Task
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateTodoForm; 