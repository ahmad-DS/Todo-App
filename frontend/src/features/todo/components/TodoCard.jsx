import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useDisclosure } from "@chakra-ui/react";
import TodoViewDrawer from "./TodoViewDrawer";

const TodoCard = ({ todo, onToggle, onDelete, onUpdate }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        bg={bgColor}
        borderColor={borderColor}
        mb={3}
        transition="all 0.2s"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
          cursor: "pointer",
        }}
        onClick={onOpen}
      >
        <VStack align="start" spacing={3}>
          <HStack justify="space-between" width="100%">
            <Text fontWeight="bold" fontSize="lg">{todo.title}</Text>
            <Badge colorScheme={todo.status ? "green" : "yellow"}>
              {todo.status ? "Completed" : "In Progress"}
            </Badge>
          </HStack>
          
          {todo.description && (
            <Text fontSize="sm" color="gray.500" noOfLines={2}>
              {todo.description}
            </Text>
          )}
          
          <HStack spacing={2} width="100%" justify="space-between">
            <HStack spacing={2}>
              {todo.dueDate && (
                <Badge colorScheme="purple">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </Badge>
              )}
              <Badge colorScheme={todo.isUrgent ? "red" : "gray"}>
                {todo.isUrgent ? "Urgent" : "Not Urgent"}
              </Badge>
              <Badge colorScheme={todo.isImportant ? "blue" : "gray"}>
                {todo.isImportant ? "Important" : "Not Important"}
              </Badge>
            </HStack>
            
            <HStack spacing={1}>
              <Tooltip label={todo.status ? "Mark Incomplete" : "Mark Complete"}>
                <IconButton
                  size="sm"
                  icon={todo.status ? <BsToggleOn size={20} /> : <BsToggleOff size={20} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(todo._id, todo.status);
                  }}
                  colorScheme={todo.status ? "green" : "gray"}
                  variant="ghost"
                />
              </Tooltip>
              <Tooltip label="Delete">
                <IconButton
                  size="sm"
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(todo._id);
                  }}
                  colorScheme="red"
                  variant="ghost"
                />
              </Tooltip>
            </HStack>
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

export default TodoCard; 