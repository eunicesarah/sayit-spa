import React, { useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Consultation.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {Flex, Text, Button} from '@chakra-ui/react';
import { Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';



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
    const navigate = useNavigate();
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            
            console.log('Unauthorized - Redirecting to login page');
            localStorage.removeItem('user');
            localStorage.removeItem('jwt');
            window.location.replace('/'); 
          }
          return Promise.reject(error);
        }
      );
    useEffect(() => {
        const user = localStorage.getItem('user');
    
        if (!user) {
          navigate('/');
          alert('Anda harus login terlebih dahulu untuk mengakses halaman ini');
        } else {

          const token = localStorage.getItem('jwt')
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('Token:', token);
          console.log('User:', user);
          fetchPsiko();
        }
      }, [navigate]);
    
  
    const fetchPsiko = () => {
      return axios.get('http://localhost:3010/user/consultation')
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

  const handleBookingConfirmation = async () => {
    if (!selectedDate || !selectedTime) {
      setSnackbarOpen(true);
      return;
    }
  
    // Mengubah format tanggal menjadi ISO-8601
    const isoDateTime = new Date(selectedDate);
    isoDateTime.setHours(parseInt(selectedTime.split(":")[0]));
    isoDateTime.setMinutes(parseInt(selectedTime.split(":")[1]));
  
    if (!selectedPsychologist) {
      console.error('No psychologist selected');
      return;
    }

    const reservationData = {
      psikolog_id: selectedPsychologist?.psikolog_id,
      user_id: 1, // User ID sesuai kebutuhan Anda
      datetime: isoDateTime.toISOString(), // Menggunakan format ISO-8601
    };
  
    try {
      const response = await axios.post('http://localhost:3010/user/reservation', reservationData);
      console.log('Booking successful!', response.data);
      console.log('Reservation data:', reservationData.psikolog_id);
      alert('Jadwal berhasil dibooking!');
    } catch (error) {
      console.error('Error while booking:', error);
      // Tampilkan pesan kesalahan jika ada
      // alert('Failed to book appointment. Please try again.');
    }
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
              <div className="psikologName">
                <p>Name:  </p>
                <p>{psychologist.psikolog_name}</p>
              </div>
              <div className="psikologEmail">
                <p>Email:  </p>
                <p>{psychologist.psikolog_email}</p>
              </div>
              <div className="psikologPhone">
                <p>Phone:  </p>
                <p>{psychologist.psikolog_phone}</p>
              </div>
              <div className="psikologKlinik">
                <p>Klinik:  </p>
                <p>{psychologist.psikolog_klinik}</p>
              </div>
              
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