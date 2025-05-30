import {
  Grid,
  GridItem,
  Box,
  Heading,
  VStack,
  Text,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import TodoCard from "./TodoCard";

const QuadrantGrid = ({ todos, onTodoClick, onToggle, onDelete }) => {
  const getQuadrantTodos = (isUrgent, isImportant) => {
    return todos.filter(
      (todo) => todo.isUrgent === isUrgent && todo.isImportant === isImportant
    );
  };

  const Quadrant = ({ title, description, todos, colorScheme }) => {
    const bgColor = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
    const borderColor = useColorModeValue(`${colorScheme}.200`, `${colorScheme}.700`);
    const titleColor = useColorModeValue(`${colorScheme}.600`, `${colorScheme}.300`);

    return (
      <GridItem
        p={6}
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="xl"
        transition="all 0.2s"
        _hover={{
          shadow: "lg",
        }}
      >
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="md" color={titleColor} mb={2}>
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {description}
            </Text>
            <Badge colorScheme={colorScheme} mt={2}>
              {todos.length} tasks
            </Badge>
          </Box>
          
          <VStack spacing={4} align="stretch">
            {todos.length === 0 ? (
              <Box
                p={4}
                bg={useColorModeValue("white", "gray.700")}
                borderRadius="md"
                borderWidth="1px"
                borderStyle="dashed"
                borderColor={borderColor}
              >
                <Text color="gray.500" textAlign="center">
                  No tasks in this quadrant
                </Text>
              </Box>
            ) : (
              todos.map((todo) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  onClick={() => onTodoClick(todo)}
                  onToggle={() => onToggle(todo)}
                  onDelete={() => onDelete(todo)}
                />
              ))
            )}
          </VStack>
        </VStack>
      </GridItem>
    );
  };

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      width="100%"
      height="100%"
    >
      <Quadrant
        title="Urgent & Important"
        description="Do these tasks first"
        todos={getQuadrantTodos(true, true)}
        colorScheme="red"
      />
      <Quadrant
        title="Important, Not Urgent"
        description="Schedule these tasks"
        todos={getQuadrantTodos(false, true)}
        colorScheme="blue"
      />
      <Quadrant
        title="Urgent, Not Important"
        description="Delegate if possible"
        todos={getQuadrantTodos(true, false)}
        colorScheme="orange"
      />
      <Quadrant
        title="Neither Urgent nor Important"
        description="Do these last or eliminate"
        todos={getQuadrantTodos(false, false)}
        colorScheme="gray"
      />
    </Grid>
  );
};

export default QuadrantGrid; 