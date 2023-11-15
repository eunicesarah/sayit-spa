import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Consultation.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Alert, AlertIcon, AlertTitle, Flex, ModalHeader, Text, Button} from '@chakra-ui/react';
import { Snackbar } from '@mui/material';


type Psychologist = {
  psikolog_id: number;
  psikolog_email: string;
  psikolog_name: string;
  psikolog_password: string;
  psikolog_klinik: string;
  psikolog_phone: string;
};

const Consultation = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const fetchPsiko = () => {
    return axios.get('http://localhost:3000/psikolog/consultation')
      .then((response) => setPsychologists(response.data.data));
  };

  useEffect(() => {
    fetchPsiko();
  }, []);

  const handleBookClick = (psychologist: Psychologist) => {
    setOpen(true);
    setSelectedPsychologist(psychologist);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    
    setSelectedTime('');
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleBookingConfirmation = () => {
    if (!selectedDate || !selectedTime) {
       
        setSnackbarOpen(true);
        return;
      }
    
    console.log('Booking Details:', {
      psychologist: selectedPsychologist,
      date: selectedDate,
      time: selectedTime,
    });


    alert('Jadwal berhasil dibooking!');
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

//   const handleBookClick = (psychologist: Psychologist) => {
//     if (!selectedDate || !selectedTime) {
//       // Show Snackbar if date or time is not selected
//       setSnackbarOpen(true);
//       return;
//     }

//     setOpen(true);
//     setSelectedPsychologist(psychologist);
//     setSelectedDate(null);
//     setSelectedTime('');
//   };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='consultation'>
      <h1>Daftar Psikolog</h1>
      {psychologists.map((psychologist) => (
        <div key={psychologist.psikolog_id} className="psychologist-card">
          <div className='psikologInfo'>
            <div className="psikologImg">
              <img src="yunis.jpg" alt={psychologist.psikolog_name} />
            </div>
            <div className="psikolofDesc">
              <h2>{psychologist.psikolog_name}</h2>
              <p>{psychologist.psikolog_phone}</p>
              <p>{psychologist.psikolog_klinik}</p>
            </div>
          </div>

          <div className="psikolofInfo">
            <button onClick={() => handleBookClick(psychologist)}>Book</button>
          </div>
        </div>
      ))}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000} 
            onClose={handleSnackbarClose}
            message="Mohon pilih tanggal dan waktu terlebih dahulu"
        />

      {selectedPsychologist && (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, border: '0', p: 2, borderRadius:'20px', background:'linear-gradient(180deg, #4560A6 ,#313e61)'}}>
            <Text textAlign="center" fontSize="xl" fontWeight={'bold'} mb={50} color={'white'}>
              Booking untuk {selectedPsychologist.psikolog_name}
            </Text>
            <Flex direction="column" align="center"> 
                <Box mb={5} borderRadius={15}>
                
                <label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    placeholderText="Pilih tanggal"
                    
                    
                />
                </label>
                </Box>

                <Box mb={4} >
                <select value={selectedTime} onChange={handleTimeChange} 
                    style={{
                        width: '100%',
                        borderRadius: '8px',
                        border: '0px',
                      }}>
                    <option value="">Pilih waktu</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="11:00">11:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>

                </select>
                </Box>
                <Box mb={4}>
                <Button onClick={handleBookingConfirmation} 
                    borderRadius="20px"
                    background="white"
                    color="black"
                    width="90px"
                    height="30px"
                    fontSize="xl"
                    fontWeight="bold"
                    _hover={{ background: 'gray.200' }}
                    _active={{ background: 'gray.300' }}
                    border={0}
                    cursor={'pointer'}
                >
                    Book
                </Button>
                </Box>
                </Flex>
        </Box>
      </Modal>
    
      )}
    </div>
  );
};

export default Consultation;