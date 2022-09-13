import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUser } from "./recoil/atoms";
import { Box, styled, ThemeProvider } from "@mui/material";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { useEffect } from "react";
import Events from "./components/Events";
import NewEvent from "./components/NewEvent";
import CalorieCalculator from "./components/CalorieCalculator";
import { theme } from "./components/Theme";
import { keyframes } from "@mui/system"

function App() {

  const setUser = useSetRecoilState(currentUser)

  const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://cardio-calendar.herokuapp.com' : 'http://localhost:3000'

  const gradient = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
  `

  const GradientBox = styled('div')({
    background: `linear-gradient(19deg, #DC1C13, #EA4C46, #F07470, #F1959B, #F6BDC0)`,
    backgroundRepeat: 'repeat',
    animation: `${gradient} 5s ease infinite`,
    backgroundSize: '200% 100%'
  })

  useEffect(() => {
    let token = localStorage.token
    if (typeof token !== 'undefined' && token.length > 1) {
      tokenLogin(token)
    } else {
      console.log("No token found, try logging in")
    }
  }, []);
  

  function tokenLogin(token) {
    fetch(`${ENDPOINT}/auto_login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jwt: token }),
    })
    .then((r) => r.json())
    .then((u) => setUser(u))
  }

  function handleLogout() {
    setUser(null)
    localStorage.removeItem('token')
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }



  return (

    <Router basename={"/cardio-calendar-frontend"}>
      <ThemeProvider theme={theme}>
        <GradientBox>
          <NavBar handleLogout={handleLogout}/>
          <Routes>
            <Route
              path="/home"
              element={
                  <Home ENDPOINT={ENDPOINT}/>
              }
            />
            <Route
              path="/"
              element={
                  <Login 
                    setUser={setUser}
                    ENDPOINT={ENDPOINT}
                  />
              }
            />
            <Route
              path="/signup"
              element={
                  <SignUp 
                    setUser={setUser}
                    ENDPOINT={ENDPOINT}
                  />
              }
            />
            <Route
              path="/event"
              element={
                  <Events
                  ENDPOINT={ENDPOINT}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                  GradientBox={GradientBox}
                  />
              }
            />
            <Route
              path="/new_event"
              element={
                  <NewEvent
                  ENDPOINT={ENDPOINT}
                  />
              }
            />
            <Route 
              path="/calculator"
              element={
                <CalorieCalculator 
                  capitalizeFirstLetter={capitalizeFirstLetter}
                />
              }
            />
          </Routes>
        </GradientBox>
      </ThemeProvider>
    </Router>

  );
}

export default App;
