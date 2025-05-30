import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  Grid,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Tooltip,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Select,
  Collapse,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { DeleteIcon, AddIcon, EditIcon, ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

let token = localStorage.getItem("token") || "";

const QuadrantTitle = ({ title, description, color }) => (
  <Box mb={4}>
    <Heading size="md" color={color}>
      {title}
    </Heading>
    <Text fontSize="sm" color="gray.500">
      {description}
    </Text>
  </Box>
);

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
                  <Heading size="md" mb={2}>{todo.title}</Heading>
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

const TodoCard = ({ todo, onToggle, onDelete, onUpdate }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        bg={bgColor}
        borderColor={borderColor}
        mb={3}
        _hover={{ shadow: "md", cursor: "pointer" }}
        onClick={onOpen}
      >
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold">{todo.title}</Text>
          {todo.description && (
            <Text fontSize="sm" color="gray.500" noOfLines={2}>
              {todo.description}
            </Text>
          )}
          {todo.dueDate && (
            <Badge colorScheme="purple">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </Badge>
          )}
          <HStack spacing={2} mt={2}>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(todo._id, todo.status);
              }}
              colorScheme={todo.status ? "green" : "gray"}
            >
              {todo.status ? <BsToggleOn size={20} /> : <BsToggleOff size={20} />}
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo._id);
              }}
            >
              <DeleteIcon />
            </Button>
          </HStack>
        </VStack>
      </Box>

      <TodoViewDrawer
        todo={todo}
        isOpen={isOpen}
        onClose={onClose}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </>
  );
};

const FilterBar = ({ onFilterChange, currentFilter }) => {
  return (
    <Flex gap={4} mb={6} wrap="wrap">
      <Select
        placeholder="Filter by Status"
        value={currentFilter.status}
        onChange={(e) => onFilterChange({ ...currentFilter, status: e.target.value })}
        maxW="200px"
      >
        <option value="all">All Tasks</option>
        <option value="active">Active Tasks</option>
        <option value="completed">Completed Tasks</option>
      </Select>

      <Select
        placeholder="Filter by Priority"
        value={currentFilter.priority}
        onChange={(e) => onFilterChange({ ...currentFilter, priority: e.target.value })}
        maxW="200px"
      >
        <option value="all">All Priorities</option>
        <option value="urgent-important">Urgent & Important</option>
        <option value="important">Important Only</option>
        <option value="urgent">Urgent Only</option>
        <option value="neither">Neither</option>
      </Select>
    </Flex>
  );
};

const CompletedTodosDrawer = ({ isOpen, onClose, completedTodos }) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const getPriorityBadges = (todo) => (
    <HStack spacing={2}>
      <Badge colorScheme={todo.isUrgent ? "red" : "gray"}>
        {todo.isUrgent ? "Urgent" : "Not Urgent"}
      </Badge>
      <Badge colorScheme={todo.isImportant ? "blue" : "gray"}>
        {todo.isImportant ? "Important" : "Not Important"}
      </Badge>
    </HStack>
  );

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Completed Tasks
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="stretch">
            {completedTodos.length === 0 ? (
              <Text color="gray.500" textAlign="center" py={4}>
                No completed tasks yet
              </Text>
            ) : (
              completedTodos.map((todo) => (
                <Box
                  key={todo._id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg={bgColor}
                  borderColor={borderColor}
                >
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" width="100%">
                      <Text fontWeight="bold" textDecoration="line-through">
                        {todo.title}
                      </Text>
                      <Badge colorScheme="green">
                        <CheckIcon mr={1} />
                        Completed
                      </Badge>
                    </HStack>
                    {todo.description && (
                      <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                        {todo.description}
                      </Text>
                    )}
                    {todo.dueDate && (
                      <Badge colorScheme="purple">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                      </Badge>
                    )}
                    {getPriorityBadges(todo)}
                  </VStack>
                </Box>
              ))
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const Todos = () => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    isUrgent: false,
    isImportant: false,
    dueDate: "",
  });
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState({
    status: "all",
    priority: "all",
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCompletedOpen, onOpen: onCompletedOpen, onClose: onCompletedClose } = useDisclosure();
  const firstField = useRef();

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
    if (!newTodo.title.trim()) return;
    fetch(`/api/todos/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then(() => {
        getTodos();
        setNewTodo({
          title: "",
          description: "",
          isUrgent: false,
          isImportant: false,
          dueDate: "",
        });
        onClose();
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

  const getQuadrantTodos = (isUrgent, isImportant) => {
    return todos.filter(
      (todo) => todo.isUrgent === isUrgent && todo.isImportant === isImportant
    );
  };

  const getFilteredTodos = () => {
    let filtered = [...todos];

    // Filter by status
    if (filter.status === "active") {
      filtered = filtered.filter((todo) => !todo.status);
    } else if (filter.status === "completed") {
      filtered = filtered.filter((todo) => todo.status);
    }

    // Filter by priority
    if (filter.priority === "urgent-important") {
      filtered = filtered.filter((todo) => todo.isUrgent && todo.isImportant);
    } else if (filter.priority === "important") {
      filtered = filtered.filter((todo) => !todo.isUrgent && todo.isImportant);
    } else if (filter.priority === "urgent") {
      filtered = filtered.filter((todo) => todo.isUrgent && !todo.isImportant);
    } else if (filter.priority === "neither") {
      filtered = filtered.filter((todo) => !todo.isUrgent && !todo.isImportant);
    }

    return filtered;
  };

  const getCompletedTodos = () => {
    return todos.filter((todo) => todo.status);
  };

  const filteredTodos = getFilteredTodos();
  const completedTodos = getCompletedTodos();

  return (
    <Box maxW="1200px" mx="auto" py={10} px={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Eisenhower Matrix</Heading>
        <HStack spacing={4}>
          <Button
            leftIcon={<CheckIcon />}
            colorScheme="green"
            variant="outline"
            onClick={onCompletedOpen}
          >
            Completed ({completedTodos.length})
          </Button>
          <Tooltip label="Add New Task" placement="left">
            <IconButton
              icon={<AddIcon />}
              colorScheme="blue"
              onClick={onOpen}
              size="lg"
              isRound
              aria-label="Add new task"
            />
          </Tooltip>
        </HStack>
      </Flex>

      <FilterBar onFilterChange={setFilter} currentFilter={filter} />

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create New Task
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} mt={4}>
              <FormControl isRequired>
                <FormLabel>Task Title</FormLabel>
                <Input
                  ref={firstField}
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })
                  }
                  placeholder="Enter task title"
                  size="lg"
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
                  size="lg"
                  rows={4}
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
                  size="lg"
                />
              </FormControl>

              <Box w="100%" p={4} bg="gray.50" borderRadius="lg">
                <VStack spacing={4}>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0" fontWeight="bold">Urgent</FormLabel>
                    <Switch
                      isChecked={newTodo.isUrgent}
                      onChange={(e) =>
                        setNewTodo({ ...newTodo, isUrgent: e.target.checked })
                      }
                      colorScheme="red"
                      size="lg"
                    />
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0" fontWeight="bold">Important</FormLabel>
                    <Switch
                      isChecked={newTodo.isImportant}
                      onChange={(e) =>
                        setNewTodo({ ...newTodo, isImportant: e.target.checked })
                      }
                      colorScheme="blue"
                      size="lg"
                    />
                  </FormControl>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={addTodo}>
              Create Task
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <CompletedTodosDrawer
        isOpen={isCompletedOpen}
        onClose={onCompletedClose}
        completedTodos={completedTodos}
      />

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {/* Quadrant 1: Urgent & Important */}
        <Box p={4} borderWidth="1px" borderRadius="lg" bg="red.50">
          <QuadrantTitle
            title="Do First"
            description="Urgent & Important"
            color="red.500"
          />
          {getQuadrantTodos(true, true)
            .filter((todo) => filteredTodos.includes(todo))
            .map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={getTodos}
              />
            ))}
        </Box>

        {/* Quadrant 2: Important but Not Urgent */}
        <Box p={4} borderWidth="1px" borderRadius="lg" bg="blue.50">
          <QuadrantTitle
            title="Schedule"
            description="Important but Not Urgent"
            color="blue.500"
          />
          {getQuadrantTodos(false, true)
            .filter((todo) => filteredTodos.includes(todo))
            .map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={getTodos}
              />
            ))}
        </Box>

        {/* Quadrant 3: Urgent but Not Important */}
        <Box p={4} borderWidth="1px" borderRadius="lg" bg="orange.50">
          <QuadrantTitle
            title="Delegate"
            description="Urgent but Not Important"
            color="orange.500"
          />
          {getQuadrantTodos(true, false)
            .filter((todo) => filteredTodos.includes(todo))
            .map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={getTodos}
              />
            ))}
        </Box>

        {/* Quadrant 4: Neither Urgent nor Important */}
        <Box p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
          <QuadrantTitle
            title="Eliminate"
            description="Neither Urgent nor Important"
            color="gray.500"
          />
          {getQuadrantTodos(false, false)
            .filter((todo) => filteredTodos.includes(todo))
            .map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={getTodos}
              />
            ))}
        </Box>
      </Grid>
    </Box>
  );
};

export default Todos;
