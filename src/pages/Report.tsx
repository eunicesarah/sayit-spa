import React from 'react';
import { Box, Image, Text, Badge } from "@chakra-ui/react";
const reports = [
{
id: 1,
name: 'Yuyun SP.G',
photo: 'https://i.imgur.com/8Km9tLL.png',
date: 'Date',
status: 'Pending',
reportedAs: 'Witness',
chronology: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos animi at totam quis praesentium quia quaerat dolorum magni iure modi, atque impedit nihil! Ab voluptatem quidem ipsa id temporibus.',
proof: 'Proof',
},
{
id: 2,
name: 'Reporter Name',
photo: 'https://i.imgur.com/8Km9tLL.png',
date: 'Date',
status: 'Pending',
reportedAs: 'Witness',
chronology: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos animi at totam quis praesentium quia quaerat dolorum magni iure modi, atque impedit nihil! Ab voluptatem quidem ipsa id temporibus.',
proof: 'Proof',
},
{
id: 3,
name: 'Reporter Name',
photo: 'https://i.imgur.com/8Km9tLL.png',
date: 'Date',
status: 'Pending',
reportedAs: 'Witness',
chronology: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos animi at totam quis praesentium quia quaerat dolorum magni iure modi, atque impedit nihil! Ab voluptatem quidem ipsa id temporibus.',
proof: 'Proof',
},
];
const Report = () => {
return (
<div >
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    sx={{
        '& > div': {
          background: 'linear-gradient(180deg, #F3AA98 ,#D9D9D9)',
        },
      }}
    >
    <h1>Daftar Laporan Pengguna</h1>
    {reports.map((report) => (
    <Box
    key={report.id}
    borderWidth="1px"
    borderRadius="30"
    w="800px"
    overflow="hidden"
    display="flex"
    flexDirection="column"
    alignItems="start"
    backgroundColor="#f0f0f0" 
    mb="40"
    p="30"
    
  >
    <Box
    display="flex"
    flexDirection="row"
    gap={20}
    >
        <Image borderRadius={50} src={report.photo} alt={report.name} />
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          as='h4'
          textTransform="uppercase"
          flexDirection={{ base: "column", md: "row" }}
          ml={{ base: "200", md: "20" }} 
        >
        <Box
            textAlign="start" 
            >{report.name}</Box>
        <Box
            textAlign="start" 
            >{report.date}</Box>
        </Box>
    </Box>
    <Box p="6">
      <Box display="flex" alignItems="baseline">
        
      </Box>
   
        <Box mt="1"  lineHeight="tight" display="flex" flexDirection="row">
            <Text textAlign="start" fontWeight={"bold"}>Status: </Text>
            <Text textAlign="start" >{report.status}</Text>

            
        </Box>
        <Box mt="1" lineHeight="tight" display="flex" flexDirection="row">
            <Text textAlign="start" fontWeight={"bold"}>Reported as:  </Text>
            <Text textAlign="start" > {report.reportedAs}</Text>
            
        </Box>

        <Box>
            <Text textAlign="start" fontWeight={"bold"}>Chronology:</Text>
            <Text textAlign="start">{report.chronology}</Text>
            
        </Box>

        <Box mt="1" lineHeight="tight" display="flex" flexDirection="row" gap={50}>
            <Text textAlign="start"fontWeight={"bold"}>Proof: </Text>
            <Image  w="200px" src="yunis.jpg" alt={report.name} />
            
        </Box>
        </Box>
    </Box>
    ))}
    </Box>
</div>
);
};

export default Report;