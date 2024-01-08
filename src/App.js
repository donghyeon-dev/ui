import logo from './logo.svg';
import axios from 'axios';
import React, {useState} from "react";
import {ChakraProvider, extendTheme, Input ,Center, Stack, Divider,Text,Box,Flex, Spacer,
Card,CardBody,Image, CardFooter,ButtonGroup,Button,Heading, AbsoluteCenter} from "@chakra-ui/react";
import themes from "./theme";


function App() {

  const theme = extendTheme(themes)

  const [characterName, setCharacterName] = useState("");

  const handleCharacterNameChange = (event) => {
    setCharacterName(event.target.value)
  }


  function fetchCharacterOverview() {
    axios.get('http://localhost:8080/character/overview?characterName='+characterName)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    
  return (
  <ChakraProvider theme={theme}>
    <Input  variant={'outline'} placeholder="type character name"
            value={characterName} onChange={handleCharacterNameChange}></Input>
    <Divider />
    <Heading size='2xl'>Character Stat</Heading>
    <Divider />


    <Card maxW='sm'>
      <Box position='relative' h='50px' borderRadius='lg'>
        <AbsoluteCenter h="25px" w="50px" bg="gray" borderRadius='lg' color='white'>
          Lv.224
        </AbsoluteCenter>
        <Box p='1' h="30px" w="150px" bg="gray" borderRadius='lg' color='white'>
          Class
        </Box>
      </Box>
      <Box position='relative' h='50px' borderRadius='lg'>
        <Text>Flex and Spacer: Full width, equal Spacing</Text>
        <Flex>
          <Box w='70px' h='10' bg='red.500'/>
          <Spacer/>
          <Box w='170px' h='10' bg='red.500'/>
          <Spacer/>
          <Box w='180px' h='10' bg='red.500'/>
        </Flex>
      </Box>
    <CardBody>
      <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='lg'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>Living room Sofa</Heading>
        <Text>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces, earthy toned spaces and for people who love a chic design with a
          sprinkle of vintage design.
        </Text>
        <Text color='blue.600' fontSize='2xl'>
          $450
        </Text>
      </Stack>
    </CardBody>
    <Divider/>
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='solid' colorScheme='blue'>
          Buy now
        </Button>
        <Button variant='ghost' colorScheme='blue'>
          Add to cart
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>

  </ChakraProvider>
  );
}

export default App;