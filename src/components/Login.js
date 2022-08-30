import { Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { passwordState, usernameState } from '../recoil/atoms';

function Login({setUser}) {

    const [username, setUsername] = useRecoilState(usernameState)
    const [password, setPassword] = useRecoilState(passwordState)
    const navigate = useNavigate()

    function handleLogin(e) {
        e.preventDefault();

        const userObj = {
            user: {
                username: username,
                password: password
            }
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        })
        .then((r) => r.json())
        .then((r) => {
            localStorage.token = r.jwt
            setUser(r.user)
            setUsername('')
            setPassword('')
            navigate('/')
        })
    }


  return (
    <Container maxWidth="false">
        <Grid container>
            <Grid item xs={12} align="center" justify="center">
                <FormControl sx={{ m: 2 }}>
                    <Typography justifySelf={'center'}>
                        Login
                    </Typography>
                    <TextField
                        sx={{ m: 2 }}
                        required
                        id="username"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                    />
                    <TextField
                        sx={{ m: 2 }}
                        required
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                    />
                    <Button
                        sx={{ m: 2 }}
                        onClick={handleLogin}
                        variant="contained"
                    >
                        Login
                    </Button>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12} align="center" justify="center">
                <Button
                    variant='contained'
                    component={Link}
                    to="/signup"
                    align="center"
                    justify="center"
                >
                    Sign Up Instead
                </Button>
            </Grid>
        </Grid>
    </Container>
  )
}

export default Login