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
  Container,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const NavLink = ({ href, title, onClick }) => (
  <ChakraLink
    as={Link}
    to={href}
    px={4}
    py={2}
    onClick={onClick}
    fontWeight="medium"
    borderRadius="md"
    fontSize="md"
    transition="all 0.2s"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('blue.50', 'gray.700'),
      color: useColorModeValue('blue.600', 'blue.300'),
      transform: 'translateY(-1px)',
    }}
  >
    {title}
  </ChakraLink>
);

const navItems = [
  { href: '/todos', title: 'Todos' },
  { href: '/signup', title: 'Sign Up' },
  { href: '/login', title: 'Log In' },
];

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      bg={bgColor}
      px={4}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Link to="/">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={useColorModeValue('blue.600', 'blue.300')}
                _hover={{ textDecoration: 'none' }}
                letterSpacing="tight"
              >
                Todo App
              </Text>
            </Link>
            <HStack 
              as="nav" 
              spacing={6} 
              display={{ base: 'none', md: 'flex' }}
              alignItems="center"
            >
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} title={item.title} />
              ))}
            </HStack>
          </HStack>

          <Flex alignItems="center" gap={4}>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle color mode"
              size="md"
              fontSize="lg"
            />
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="ghost"
                cursor="pointer"
                minW={0}
                p={0}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              >
                <Avatar
                  size="sm"
                  name="User"
                  src="https://bit.ly/broken-link"
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Text fontWeight="medium">Profile</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="medium">Settings</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Text fontWeight="medium" color="red.500">Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ md: 'none' }}
              onClick={onToggle}
              variant="ghost"
            />
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box 
            pb={4} 
            display={{ md: 'none' }}
            bg={bgColor}
            borderTop="1px"
            borderColor={borderColor}
            mt={2}
          >
            <VStack as="nav" spacing={3} align="stretch" px={2}>
              {navItems.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href} 
                  title={item.title}
                  onClick={onToggle}
                />
              ))}
            </VStack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar;