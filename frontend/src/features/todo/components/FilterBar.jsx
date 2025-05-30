import { Flex, Select } from "@chakra-ui/react";

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

export default FilterBar; 