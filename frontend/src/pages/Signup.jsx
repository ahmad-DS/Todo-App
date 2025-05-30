import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const initState = {
  name: "",
  email: "",
  password: "",
  age: ""
}
function Signup() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [user, setUser] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)
    setUser({ ...user, [name]: name == "age" ? +value : value })

  }
  console.log(user)

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        alert("sign up successful!")
        navigate("/login")
      })
      .catch(err => { console.log(err) })
  }

  return (
    <Flex
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={5} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'lg'} color={'black'}>
            Create Your Account Here
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="Name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input name="name" onChange={handleChange} type="text" />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name="email" onChange={handleChange} type="email" />
              </FormControl>


              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input name="password" onChange={handleChange} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <Input name="age" onChange={handleChange} type="number" />
              </FormControl>
              <Stack spacing={5} pt={0}>
                <Button
                   loadingText="Submitting"
                   size="lg"
                   bg={'blue.400'}
                   color={'white'}
                   _hover={{
                     bg: 'black',
                     color:'white'
                   }}
                   type="submit"

                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={0}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} to={'/login'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex >
  )
}

export default Signup