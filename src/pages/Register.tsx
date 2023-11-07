import React, { useState } from 'react';
import '../styles/Register.css';

import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
// import PopUp from '@/components/fragments/popup'
// import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
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

