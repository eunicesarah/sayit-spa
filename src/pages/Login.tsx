import React, { useState } from 'react';
import '../styles/Login.css';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
// import PopUp from '@/components/fragments/popup'
// import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="box">
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleSubmit} method="POST">
                <div className="inputBox">
                    <TextField sx={{ width: '26ch', marginBottom:'15px' }} id="email" label="Email" placeholder="Type your email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
                            className="iconButton"
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
                
                <button type="submit" name="" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Sign In"}
                </button>
                <p className="loginText">
                    Don{"'"}t have an account? <Link className='registerLink' to="/register">Sign up here</Link>
                </p>
            </form>
    </div>
  );
};

export default Login;
