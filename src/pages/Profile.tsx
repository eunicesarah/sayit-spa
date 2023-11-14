import React, { useState } from 'react';
import { Flex, Box, Input, Button, Text } from '@chakra-ui/react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: 'Psikolog 1',
        email: 'psikolog1@example.com',
        practiceLocation: 'Klinik Psikologi XYZ',
        password: 'hehe',
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // You can add logic here to save the updated data to your backend
        // For simplicity, we're just logging the updated data to the console
        console.log('Updated data:', formData);
        console.log('Updated data:', formData.email);
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
                value={formData.name}
                isReadOnly={!isEditing}
                onChange={(e) => handleChange('name', e.target.value)}
                borderRadius={10}
                border={0}
                height={'30px'}
                width={'250px'}
                />
            </Flex>
            </Box>

            <Box mb="3" textAlign="start">
            <Text {...labelStyle} fontWeight={"bold"}>Email:</Text>
            <Flex align="center">
                <Input
                value={formData.email}
                isReadOnly={!isEditing}
                onChange={(e) => handleChange('email', e.target.value)}
                borderRadius={10}
                border={0}
                height={'30px'}
                width={'250px'}
                />
            </Flex>
            </Box>

            <Box mb="3" textAlign="start">
            <Text {...labelStyle} fontWeight={"bold"}>Practice Location:</Text>
            <Flex align="center">
                <Input
                value={formData.practiceLocation}
                isReadOnly={!isEditing}
                onChange={(e) => handleChange('practiceLocation', e.target.value)}
                borderRadius={10}
                border={0}
                height={'30px'}
                width={'250px'}
                />
            </Flex>
            </Box>

            <Box mb="3" textAlign="start">
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
            </Box>

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
