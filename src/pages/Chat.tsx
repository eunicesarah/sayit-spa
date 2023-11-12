import React, { useState, useRef, useEffect } from 'react';
import {
  Flex,
  Box,
  Input,
  Button,
  Text,
  Avatar,
  extendTheme,
  ChakraProvider,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

interface Psychologist {
  id: number;
  name: string;
}


const customColors = {
  primary: '#4560A6',
  secondary: '#D9D9D9',
  accent: '#F3AA98',
};


const customTheme = extendTheme({
  colors: {
    roomchat: {
      header: customColors.accent,
      userMessage: customColors.secondary,
      psychologistMessage: customColors.accent,
      divider: customColors.secondary,
      inputBorder: customColors.secondary,
    },
  },
});

const ChatRoom = () => {
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const psychologists: Psychologist[] = [
    { id: 1, name: 'Yuyun SP.g' },
    { id: 2, name: 'Nana Sudrana' },
    
  ];


  const { psychologistId } = useParams<{ psychologistId: string }>();

  useEffect(() => {

    const foundPsychologist = psychologists.find((psychologist: { id: number; }) => psychologist.id === Number(psychologistId));
    if (foundPsychologist) {
      setSelectedPsychologist(foundPsychologist);
    }
  }, [psychologistId]);

  const handleSendMessage = (): void => {
    if (newMessage.trim() !== '') { 
      setChatMessages([...chatMessages, { sender: 'user', message: newMessage }]);
      setNewMessage('');
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <ChakraProvider theme={customTheme}>
      <Flex className="chat-container" direction="row" >
        <Box className="room-left" p={4} minW="250px" alignItems='start' display='flex' flexDir='column'>
          <Text fontSize="xl" mb={4}>Daftar Psikolog</Text>
          <ul>
            {psychologists.map((psychologist) => (
              <li key={psychologist.id} onClick={() => setSelectedPsychologist(psychologist)} style={{ cursor: 'pointer' }}>
                {psychologist.name}
              </li>
            ))}
          </ul>
        </Box>
        <Box className="divider" bg="roomchat.divider" width="10px" />
        <Flex className="room-right" direction="column" flex={1}>
          {selectedPsychologist ? (
            <>
              <Box className="header" p={4} bg="roomchat.header" color="black" display='flex' flexDir='row' alignItems='center'>
                <Avatar name={selectedPsychologist.name} src={`psychologist_avatar_url_${selectedPsychologist.id}`} bg={customColors.secondary} mr={2} />
                <Text fontSize="xl">{selectedPsychologist.name}</Text>
              </Box>

              <Flex
                className="room-chat"
                direction="column"
                flex={1}
                overflowY="auto"
                p={4}
                maxHeight="630px"
                minHeight="630px"
                ref={chatContainerRef}
              >
                {chatMessages.map((message, index) => (
                  <Flex key={index} mb={4} justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'} alignItems="center">
                    {message.sender === 'psychologist' && (
                      <Avatar name={selectedPsychologist.name} src={`psychologist_avatar_url_${selectedPsychologist.id}`} bg={customColors.accent} mr={2} />
                    )}
                    <Box
                      p={3}
                      borderRadius={20}
                      
                      display='flex'
                      textAlign='left'
                      alignItems='center'
                      color="black"
                      bg={message.sender === 'user' ? 'roomchat.userMessage' : 'roomchat.psychologistMessage'}
                      alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                      maxW="50%" 
                      wordBreak="break-word"
                      height={message.message.length > 50 ? 'auto' : '50px'}
                    >
                      {message.message}
                    </Box>
                    {message.sender === 'user' && (
                      <Avatar
                      name="User"
                      src="user_avatar_url"
                      bg={customColors.primary}
                      ml={2}
                      size="sm"
                    />
                    )}
                  </Flex>
                ))}

              </Flex>

              <Flex className="input-section" p={2} borderTop="1px" borderColor="roomchat.inputBorder">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleEnterPress}
                  size="lg"
                  borderRadius="20"
                  background="white"
                  flex={1}
                />
                <Button ml={2} bgColor={customColors.accent} onClick={handleSendMessage} borderRadius="20">
                  Send
                </Button>
              </Flex>
            </>
          ) : (
            <Text fontSize="lg" textAlign="center" p={4}>
              Pilih psikolog untuk memulai obrolan
            </Text>
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default ChatRoom;
