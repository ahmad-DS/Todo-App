import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  Collapse,
  useDisclosure,
  VStack,
  HStack,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const NavLink = ({ href, title, onClick }) => (
  <ChakraLink
    as={Link}
    to={href}
    px={3}
    py={2}
    onClick={onClick}
    fontWeight="medium"
    borderRadius="md"
    fontSize="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('blue.100', 'gray.700'),
      color: useColorModeValue('blue.600', 'blue.300'),
    }}
    w="100%"
    textAlign="left"
  >
    {title}
  </ChakraLink>
);

const navItems = [
  { href: '/todos', title: 'Todos' },
  { href: '/signup', title: 'Sign Up' },
  { href: '/login', title: 'Log In' },
];

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('blue.400', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <ChakraLink
          as={Link}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          color="white"
        >
          Todo App
        </ChakraLink>

        {/* Hamburger Icon */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          display={{ md: 'none' }}
          onClick={onToggle}
          color="white"
          bg="transparent"
          _hover={{ bg: 'blue.500' }}
        />

        {/* Desktop Links */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }} alignItems="center">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}

          <Button onClick={toggleColorMode} size="sm" variant="ghost" color="white">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar
                size="sm"
                src="https://avatars.githubusercontent.com/u/63135773?v=4"
              />
            </MenuButton>
            <MenuList>
              <Box textAlign="center" p={3}>
                <Avatar
                  size="lg"
                  src="https://avatars.githubusercontent.com/u/63135773?v=4"
                  mb={2}
                />
                <Text fontWeight="bold">Shakil Ahmad</Text>
              </Box>
              <MenuDivider />
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Mobile Links */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: 'none' }}>
          <VStack spacing={3} align="start">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} onClick={onClose} />
            ))}
            <Button onClick={toggleColorMode} size="sm" variant="ghost" color="white">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}
