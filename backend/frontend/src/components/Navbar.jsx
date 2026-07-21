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
    borderRadius="full"
    fontSize="md"
    color={useColorModeValue('gray.700', 'gray.100')}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('blue.50', 'whiteAlpha.200'),
      color: useColorModeValue('blue.600', 'blue.200'),
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
  const navBg = useColorModeValue('white', 'gray.900');
  const navBorder = useColorModeValue('gray.100', 'gray.700');
  const brandGradient = useColorModeValue('linear(to-r, blue.600, purple.500)', 'linear(to-r, blue.300, purple.400)');

  return (
    <Box bg={navBg} px={4} borderBottomWidth="1px" borderColor={navBorder} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <ChakraLink
          as={Link}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          bgClip="text"
          bgGradient={brandGradient}
        >
          Taskly
        </ChakraLink>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          display={{ md: 'none' }}
          onClick={onToggle}
          variant="ghost"
          color={useColorModeValue('blue.600', 'blue.200')}
        />

        <HStack spacing={4} display={{ base: 'none', md: 'flex' }} alignItems="center">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}

          <Button onClick={toggleColorMode} size="sm" variant="ghost" colorScheme="blue">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Menu>
            <MenuButton as={Button} rounded="full" variant="ghost" cursor="pointer" minW={0} p={1}>
              <Avatar size="sm" src="https://avatars.githubusercontent.com/u/63135773?v=4" />
            </MenuButton>
            <MenuList>
              <Box textAlign="center" p={3}>
                <Avatar size="lg" src="https://avatars.githubusercontent.com/u/63135773?v=4" mb={2} />
                <Text fontWeight="bold">Shakil Ahmad</Text>
              </Box>
              <MenuDivider />
              <MenuItem>Account Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: 'none' }}>
          <VStack spacing={3} align="start">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} onClick={onClose} />
            ))}
            <Button onClick={toggleColorMode} size="sm" variant="ghost" colorScheme="blue">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}
