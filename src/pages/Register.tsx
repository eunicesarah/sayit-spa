import React, { useState } from 'react';
import '../styles/Register.css';

import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
// import PopUp from '@/components/fragments/popup'
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [clinic, setClinic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const history = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submitting...');
    console.log(name, email, phoneNumber, password, clinic);
    
    try {
      const response = await axios.post('http://localhost:3010/psikolog/register/', {
        psikolog_name: name,
        psikolog_email: email,
        psikolog_phone: phoneNumber,
        psikolog_password: password,
        psikolog_klinik: clinic,
      });
      navigate('/login');
      console.log('Response:', response);
      if (response.status === 200) {
        // Registrasi berhasil, arahkan pengguna ke halaman login
        navigate('/login');
      } else {
        console.log('Registration failed:', response);
      }
    }
    catch (error) {
      console.log(error);
    }
    
  };
  
  return (
    <div className="box">
      <h2>REGISTER</h2>
            {/* {error && <p className={styles.error}>{error}</p>} */}
            <form className="registerForm" onSubmit={handleSubmit} method="POST">
                <div className="inputBox">
                    <TextField sx={{ width: '26ch', marginBottom:'15px' }} id="email" label="Email" placeholder="Type your email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="inputBox">
                    <TextField sx={{ width: '26ch', marginBottom:'15px' }} id="userName" label="Username" placeholder="Type your username" variant="standard" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="inputBox">
                    <FormControl sx={{ width: '26ch', marginBottom:'15px'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="userPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Type your password'
                            name="userPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className="inputBox">
                    <FormControl sx={{ width: '26ch', marginBottom:'15px'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                        <Input
                            id="userConfirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm your password'
                            name="userConfirmPassword"
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                    
                </div>
                <div className="inputBox">
                    <TextField sx={{ width: '26ch', marginBottom:'15px' }} id="phoneNumber" label="Phone Number" placeholder="Type your phone number" variant="standard" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="inputBox">
                    <TextField sx={{ width: '26ch', marginBottom:'15px' }} id="klinik" label="Klinik" placeholder="Type your clinic" variant="standard" value= {clinic} onChange={(e) => setClinic(e.target.value)}/>
                </div>
                <button type="submit" name="" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Sign Up"}
                </button>
                <p className="registerText">
                  Have an account? <Link className="loginLink" to="/login">Login</Link>
                </p>
            </form>
    </div>
  );
};

export default Register;
function useRouter(): { push: any; } {
  throw new Error('Function not implemented.');
}

