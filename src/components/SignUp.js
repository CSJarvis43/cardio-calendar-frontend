import { Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { errorMessageState, loggedInState, passwordState, usernameState } from '../recoil/atoms';

function SignUp({ setUser }) {
    const [username, setUsername] = useRecoilState(usernameState)
    const [password, setPassword] = useRecoilState(passwordState)
    const setLoggedIn = useSetRecoilState(loggedInState)
    const setErrorMessage = useSetRecoilState(errorMessageState)

    const navigate = useNavigate()

    function handleSignup(e) {
        e.preventDefault();

        const userObj = {
            user: {
                username: username,
                password: password
            }
        }

        // console.log(userObj)


        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        })
        .then((r) => r.json())
        .then((r) => {
            if ((r).status ==="created") {
                setLoggedIn(true)
                setUser(r.user)
                setErrorMessage("")
                setUsername('')
                setPassword('')
                navigate('/')
            }
        })
        .catch((r) => 
            setErrorMessage("Signup failed")
        )
        // .then(navigate('/'))
    }

    return (
        <Container maxWidth="false">
            <Grid container>
                <Grid item xs={12} align="center" justify="center">
                    <FormControl sx={{ m: 2 }}>
                        <Typography justifySelf={'center'}>
                            Sign Up!
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
                            onClick={handleSignup}
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} align="center" justify="center">
                    <Button
                        variant='contained'
                        component={Link}
                        to="/login"
                        align="center"
                        justify="center"
                    >
                        Log In Instead
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignUp