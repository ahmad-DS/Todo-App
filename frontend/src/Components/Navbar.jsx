import React from 'react'
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
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {Link} from "react-router-dom"
const NavLink = ({ href,title }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={href}>
    {title}
  </Link>
);

const y =[
	{
		href:"/todos",
		title:'Todo'
	},
	{
		href:"/signup",
		title:'SignUp'
	},
	{
		href:"/login",
		title:'LogIn'
	},
]

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue('blue.400', 'gray.900')} px={4} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box fontWeight={'bold'}><Link>Todo Home</Link></Box>

          <Flex alignItems={'center'} gap={5} fontWeight={500} fontFamily={'cursive'}>
			{
				y.map((el,i)=>{
					console.log(el)
					return <NavLink href={el.href} title={el.title}/>
				})
			}
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.githubusercontent.com/u/63135773?v=4'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.githubusercontent.com/u/63135773?v=4'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}