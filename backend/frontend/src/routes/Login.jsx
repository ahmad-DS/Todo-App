import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("successfully logged in");
        navigate("/todos");
        localStorage.setItem("token", res.token);
      })
      .catch((err) => {
        alert(`login failed:: ${err.message}`);
        console.log(err);
      });
  };

  return (
    <Flex minH="90vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={5} px={6}>
        <Stack align="center">
          <Heading fontSize="2xl">Welcome back</Heading>
          <Text color="gray.500">Log in to continue managing your tasks</Text>
        </Stack>
        <Box rounded="2xl" bg={useColorModeValue('white', 'gray.700')} boxShadow="xl" p={8} borderWidth="1px">
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input name="email" onChange={handleChange} type="email" placeholder="you@example.com" />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input name="password" onChange={handleChange} type={showPassword ? 'text' : 'password'} placeholder="Enter password" />
                  <InputRightElement h="full">
                    <Button variant="ghost" onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button loadingText="Submitting" size="lg" bg="blue.500" color="white" _hover={{ bg: 'blue.600' }} type="submit">
                Log in
              </Button>

              <Text align="center">
                New here? <Link color="blue.400" to="/signup">Create account</Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;