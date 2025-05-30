import { Box, Heading, Text } from "@chakra-ui/react";

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

export default QuadrantTitle; 