import React, { useEffect, useState } from 'react';
import { Flex, Box, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
type Psychologist = {
    psikolog_id: any;
    psikolog_email: string;
    psikolog_name: string;
    psikolog_password: string;
    psikolog_klinik: string;
    psikolog_phone: string;
  };
const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
    const [formData, setFormData] = useState({
        psikolog_id: '',
        psikolog_name: '',
        psikolog_phone: '',
        psikolog_klinik: '',
        
      });
    const navigate = useNavigate();
    useEffect(() => {
        const userString = localStorage.getItem('user');
    
        if (userString) {
          const user: Psychologist = JSON.parse(userString);
          const { psikolog_id, psikolog_name, psikolog_email, psikolog_klinik, psikolog_password, psikolog_phone } = user;
    
          setFormData({
            psikolog_id: psikolog_id,
            psikolog_name: psikolog_name,
            psikolog_phone: psikolog_phone,
            psikolog_klinik: psikolog_klinik,
            
          });
        } else {
          
          navigate('/login');
          alert('Anda harus login terlebih dahulu untuk mengakses halaman ini');
        }
      }, [navigate]);

    //   const fetchPsiko = (psychologistId: number) => {
    //     return axios.get(`http://localhost:3000/user/${psychologistId}`)
    //       .then((response) => setPsychologists(response.data.data));
    //   };
      
      
      
    
    

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
    
        try {
          const userString = localStorage.getItem('user');
          if (userString) {
            const user: Psychologist = JSON.parse(userString);
            const { psikolog_id } = user;
    
            const response = await axios.put(`http://localhost:3010/psikolog/update/${psikolog_id}`, formData);
    
            console.log('Update response:', response.data);
            // On the client side
            console.log('Request payload:', formData);



            
    
        
          }
        } catch (error) {
          console.error('Error updating profile:', error);
         
        }
      };
    

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const boxStyle = {
        width: '500px',
        padding: '4',
        borderWidth: '1px',
        borderRadius: 'lg',
        backgroundColor: '#F3AA98',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        marginBottom: '2',
        // fontWeight: 'bold',
        color: '#4560A6',
        fontSize: '25px',
    };

    const labelStyle = {
        color: '#4560A6',
        marginBottom: '1',
    };

    return (
        <Flex direction="column" align="center" justifyContent="center">
        <Box
            {...boxStyle}
            display="flex"
            flexDir="column"
            alignItems="center"
            top="50%"
            left="50%"
            position="absolute"
            transform="translate(-50%, -50%)"
            borderRadius="15px"
            pb="50px"
        >
            <Text {...headingStyle} fontWeight={"bold"}>Update Profile</Text>

            <Box mb="3" textAlign="start">
            <Text {...labelStyle} fontWeight={"bold"}>Name:</Text>
            <Flex align="center">
                <Input
                value={formData.psikolog_name}
                isReadOnly={!isEditing}
                onChange={(e) => handleChange('psikolog_name', e.target.value)}
                borderRadius={10}
                border={0}
                height={'30px'}
                width={'250px'}
                />
            </Flex>
            </Box>

            <Box mb="3" textAlign="start">
            <Text {...labelStyle} fontWeight={"bold"}>Phone:</Text>
            <Flex align="center">
                <Input
                value={formData.psikolog_phone}
                isReadOnly={!isEditing}
                onChange={(e) => handleChange('psikolog_phone', e.target.value)}
                borderRadius={10}
                border={0}
                height={'30px'}
                width={'250px'}
                />
            </Flex>
            </Box>

            <Box mb="3" textAlign="start">
            <Text {...labelStyle} fontWeight={"bold"}>Klinik:</Text>
            <Flex align="center">
                <Input
                value={formData.psikolog_klinik}
                isReadOnly={!isEditing}
                onChange={(e) => handleChange('psikolog_klinik', e.target.value)}
                borderRadius={10}
                border={0}
                height={'30px'}
                width={'250px'}
                />
            </Flex>
            </Box>

            {/* <Box mb="3" textAlign="start">
            <Text {...labelStyle} fontWeight={"bold"}>Password:</Text>
            <Flex align="center">
                <Input
                value={formData.password}
                variant='outline'
                isReadOnly={!isEditing}
                size="lg"
                onChange={(e) => handleChange('password', e.target.value)}
                borderRadius={10}
                border={0}
                height={'30px'}
                width={'250px'}
                // width={'100%'}
                // display={'flex'}
                // alignItems={'center'}
                // justifyContent={'center'}
                />
            </Flex>
            </Box> */}

            <Button
            colorScheme="green"
            bgColor={'#4560A6'}
            color={'white'}
            size={'lg'}
            border={0}
            borderRadius={10}
            height={'30px'}
            width={'150px'}
            fontWeight={'bold'}
            onClick={isEditing ? handleSave : handleEdit}
            mb="3"
            mt="35"
            _hover={{ bg: '#264779'}}
            _active={{
                bg: '#264779',
                transform: 'scale(0.95)',
            }}
            cursor={'pointer'}
            >
            {isEditing ? 'Save' : 'Edit'}
            </Button>
        </Box>
        
        </Flex>
    );
};

export default Profile;
