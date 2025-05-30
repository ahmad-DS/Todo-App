import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const CompletedTodosDrawer = ({ isOpen, onClose, completedTodos }) => {
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

export default CompletedTodosDrawer; 